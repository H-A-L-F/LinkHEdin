package my_auth

import (
	"context"
	"errors"
	"fmt"

	"LinkHEdin/database"
	"LinkHEdin/graph/model"
	"LinkHEdin/lib"
	"LinkHEdin/mail"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserRegister(ctx context.Context, newUser model.NewUser) (interface{}, error) {

	_, err := UserGetByEmail(ctx, newUser.Email)

	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, newUser)
	if err != nil {
		return nil, err
	}
	fmt.Print("lewat create")

	token, err := GenerateJWT(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}
	fmt.Print("Lewat jwt")

	newId := uuid.New().String()

	verification := &model.UserValidation{
		ID:     newId,
		Link:   "http://localhost:5173/verification/" + newId,
		Code:   lib.RangeIn(1000, 9999),
		UserID: createdUser.ID,
	}

	db := database.GetDB()
	err = db.Create(verification).Error

	if err != nil {
		return nil, err
	}
	fmt.Print("Lewat verif")

	fmt.Print("Mau send")
	mail.SendVerification(verification.Link, createdUser.Email, verification.Code)
	fmt.Print("Udah send")

	return map[string]interface{}{
		"id":             createdUser.ID,
		"token":          token,
		"name":           createdUser.Name,
		"email":          createdUser.Email,
		"PhotoProfile":   createdUser.PhotoProfile,
		"FollowedUser":   createdUser.FollowedUser,
		"RequestConnect": createdUser.RequestConnect,
		"BgPhotoProfile": createdUser.BgPhotoProfile,
	}, nil
}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	user, err := UserGetByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email Not Found",
			}
		}
		return nil, err
	}

	if !user.Validate {
		return nil, errors.New("please activate your account first")
	}

	if err := ComparePassword(user.Password, password); err != nil {
		return nil, err
	}

	token, err := GenerateJWT(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"id":             user.ID,
		"token":          token,
		"name":           user.Name,
		"email":          user.Email,
		"photoprofile":   user.PhotoProfile,
		"followeduser":   user.FollowedUser,
		"requestconnect": user.RequestConnect,
		"bgphotoprofile": user.BgPhotoProfile,
		"connecteduser":  user.ConnectedUser,
		"headline":       user.Headline,
		"profileviews":   user.ProfileViews,
	}, nil
}
