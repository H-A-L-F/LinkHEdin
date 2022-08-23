package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	my_auth "LinkHEdin/auth"
	"LinkHEdin/graph/generated"
	"LinkHEdin/graph/model"
	"LinkHEdin/lib"
	"LinkHEdin/mail"
	middleware "LinkHEdin/middlewares"
	"context"

	"github.com/google/uuid"
)

// RequestChangePassword is the resolver for the requestChangePassword field.
func (r *mutationResolver) RequestChangePassword(ctx context.Context, email string) (string, error) {
	var user *model.User

	if err := r.DB.First(&user, "email = ?", email).Error; err != nil {
		return "Error", err
	}

	changePasswordRequest := &model.ChangePasswordRequest{
		ID:     uuid.NewString(),
		Email:  user.Email,
		Code:   lib.RangeIn(1000, 9999),
		IsUsed: false,
	}

	if err := r.DB.Create(changePasswordRequest).Error; err != nil {
		return "Error", err
	}

	link := "http://localhost:5173/guest/resetpass/" + changePasswordRequest.ID
	mail.SendPasswordRequest(link, changePasswordRequest.Email, changePasswordRequest.Code)
	return "Ok", nil
}

// ValidateChangePass is the resolver for the validateChangePass field.
func (r *mutationResolver) ValidateChangePass(ctx context.Context, input model.ValidChangePass) (string, error) {
	var validate *model.ChangePasswordRequest

	if err := r.DB.Where("id = ? AND code = ?", input.ID, input.Code).First(&validate).Error; err != nil {
		return "Change password request not found", err
	}

	return "Ok", nil
}

// ChangePassword is the resolver for the changePassword field.
func (r *mutationResolver) ChangePassword(ctx context.Context, password string, id string) (string, error) {
	var request *model.ChangePasswordRequest
	err := r.DB.First(&request, "id = ?", id).Error
	if err != nil {
		return "Code Not Valid", err
	}

	var user *model.User
	err = r.DB.First(&user, "email = ?", request.Email).Error
	if err != nil {
		return "User not found", err
	}

	user.Password = my_auth.HashPassword(password)
	err = r.DB.Save(user).Error
	if err != nil {
		return "Failed to update user", err
	}
	return "Change Password Succed!", nil
}

// Follow is the resolver for the follow field.
func (r *mutationResolver) Follow(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Not Found", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Not Found", err
	}

	for i, val := range user.FollowedUser {
		if val == getUser.ID {
			// Found
			user.FollowedUser = lib.RemoveArrayByIndex(user.FollowedUser, i)
			return "Removed", r.DB.Save(user).Error
		}
	}
	// Not Found
	user.FollowedUser = append(user.FollowedUser, getUser.ID)
	return "Added", r.DB.Save(user).Error
}

// ValidateUser is the resolver for the validateUser field.
func (r *mutationResolver) ValidateUser(ctx context.Context, input model.ValidReq) (string, error) {
	var validation *model.UserValidation

	if err := r.DB.Where("id = ? AND code = ?", input.ID, input.Code).First(&validation).Error; err != nil {
		return "Validation Not Found", err
	}

	var user *model.User

	if err := r.DB.First(&user, "id = ?", validation.UserID).Error; err != nil {
		return "Not Found User", err
	}

	user.Validate = true
	return "Success Validating User!", r.DB.Save(user).Error
}

// ValidateUserWithEmail is the resolver for the validateUserWithEmail field.
func (r *mutationResolver) ValidateUserWithEmail(ctx context.Context, email string) (string, error) {
	var user *model.User
	if err := r.DB.First(&user, "email = ?", email).Error; err != nil {
		return "Not Found", err
	}

	user.Validate = true
	return "Success Validating User!", r.DB.Save(user).Error
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	return my_auth.UserLogin(ctx, email, password)
}

// Register is the resolver for the register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	return my_auth.UserRegister(ctx, input)
}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	model := &model.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	err := r.DB.Create(model).Error
	return model, err
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.NewUser) (*model.User, error) {
	var model *model.User

	if err := r.DB.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Email = input.Email
	model.Password = input.Password
	model.Name = input.Name
	return model, r.DB.Save(model).Error
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*model.User, error) {
	var model *model.User

	if err := r.DB.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model, r.DB.Delete(model).Error
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	var user *model.User
	return user, r.DB.First(&user, "id = ?", id).Error
}

// Users is the resolver for the Users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var models []*model.User
	return models, r.DB.Find(&models).Error
}

// Whoisme is the resolver for the whoisme field.
func (r *queryResolver) Whoisme(ctx context.Context) (*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// FollowedUser is the resolver for the FollowedUser field.
func (r *userResolver) FollowedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.FollowedUser, nil
}

// ConnectedUser is the resolver for the ConnectedUser field.
func (r *userResolver) ConnectedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectedUser, nil
}

// RequestConnect is the resolver for the RequestConnect field.
func (r *userResolver) RequestConnect(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.RequestConnect, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
