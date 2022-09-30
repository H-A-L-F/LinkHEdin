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

	if err := r.DB.First(&request, "id = ?", id).Error; err != nil {
		return "Code Not Valid", err
	}

	var user *model.User

	if err := r.DB.First(&user, "email = ?", request.Email).Error; err != nil {
		return "User not found", err
	}

	user.Password = my_auth.HashPassword(password)

	if err := r.DB.Save(user).Error; err != nil {
		return "Failed to update user", err
	}

	if err := r.DB.Delete(request).Error; err != nil {
		return "Failed to delete change password request row", err
	}

	return "Change Password Succeeded!", nil
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

	// unfollow
	for i, val := range user.FollowedUser {
		if val == getUser.ID {
			// Found
			user.FollowedUser = lib.RemoveArrayByIndex(user.FollowedUser, i)
			return "Removed", r.DB.Save(user).Error
		}
	}

	// follow
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
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.UpdateUser) (*model.User, error) {
	var model *model.User

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if input.BgPhotoProfile != "" {
		model.BgPhotoProfile = input.BgPhotoProfile
	}

	if input.Email != "" {
		model.Email = input.Email
	}

	if input.Headline != "" {
		model.Headline = input.Headline
	}
	if input.Name != "" {
		model.Name = input.Name
	}
	if input.PhotoProfile != "" {
		model.PhotoProfile = input.PhotoProfile
	}

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

// SearchConnected is the resolver for the searchConnected field.
func (r *queryResolver) SearchConnected(ctx context.Context) ([]*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var connectedUser []*model.User
	r.DB.Raw("select * from users where cast(users.id as text) = any (select  unnest(u.connected_user) as connected from users u where u.id = ?)", val.ID).Scan(&connectedUser)
	return connectedUser, nil
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

// UserSuggestion is the resolver for the userSuggestion field.
func (r *queryResolver) UserSuggestion(ctx context.Context) ([]*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	var models []*model.User
	r.DB.Raw("select * from users where cast(users.id as text) = any (select unnest(users.connected_user) from users where cast(users.id as text) = any (select unnest(u.connected_user) from users u where u.id = ?)) and users.id != ?", val.ID, val.ID).Scan(&models)
	return models, nil
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

// RequestConnectTxt is the resolver for the RequestConnectTxt field.
func (r *userResolver) RequestConnectTxt(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.RequestConnectTxt, nil
}

// Headline is the resolver for the Headline field.
func (r *userResolver) Headline(ctx context.Context, obj *model.User) (string, error) {
	var model *model.Experience

	if err := r.DB.First(&model, "user_id = ? AND active = true", obj.ID).Error; err != nil {
		return "No headline", nil
	}

	return model.Title, nil
}

// BlockedUser is the resolver for the BlockedUser field.
func (r *userResolver) BlockedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.BlockedUser, nil
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
