package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"LinkHEdin/graph/model"
	"LinkHEdin/lib"
	middleware "LinkHEdin/middlewares"
	"context"
	"fmt"
)

// CreateRequest is the resolver for the createRequest field.
func (r *mutationResolver) CreateRequest(ctx context.Context, userID string, text string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", userID).Error
	if err != nil {
		return "Error", err
	}
	getUser.RequestConnect = append(getUser.RequestConnect, user.ID)
	getUser.RequestConnectTxt = append(getUser.RequestConnectTxt, text)
	return "Ok", r.DB.Save(getUser).Error
}

// AcceptRequest is the resolver for the acceptRequest field.
func (r *mutationResolver) AcceptRequest(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	// User -> Yang Accept Request
	// Get User -> Yang Diaccept Requestnya

	// REMOVING CONNECT_REQUEST
	for i, val := range user.RequestConnect {
		if val == getUser.ID {
			user.RequestConnect = lib.RemoveArrayByIndex(user.RequestConnect, i)
			user.RequestConnectTxt = lib.RemoveArrayByIndex(user.RequestConnectTxt, i)
			break
		}
	}

	// ADD CONNECTED_USER
	user.ConnectedUser = append(user.ConnectedUser, getUser.ID)
	getUser.ConnectedUser = append(getUser.ConnectedUser, user.ID)

	err = r.DB.Save(getUser).Error
	if err != nil {
		return "Error", err
	}

	err = r.DB.Save(user).Error
	if err != nil {
		return "Error", err
	}

	return "Ok", nil
}

// DeclineRequest is the resolver for the declineRequest field.
func (r *mutationResolver) DeclineRequest(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	// User -> Yang Decline Request
	// Get User -> Yang Di Decline Requestnya

	// REMOVING CONNECT_REQUEST
	for i, val := range user.RequestConnect {
		fmt.Print("lolos")
		if val == getUser.ID {
			fmt.Print(val, getUser.ID)
			user.RequestConnect = lib.RemoveArrayByIndex(user.RequestConnect, i)
			user.RequestConnectTxt = lib.RemoveArrayByIndex(user.RequestConnectTxt, i)
		}
	}

	err = r.DB.Save(getUser).Error
	if err != nil {
		return "Error", err
	}

	err = r.DB.Save(user).Error
	if err != nil {
		return "Error", err
	}

	return "Ok", r.DB.Save(user).Error
}

// RemoveRequest is the resolver for the removeRequest field.
func (r *mutationResolver) RemoveRequest(ctx context.Context, id string, target string) (string, error) {
	var user *model.User
	err := r.DB.First(&user, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", target).Error
	if err != nil {
		return "Error", err
	}
	fmt.Print("masuk")
	// User -> Yang Decline Request
	// Get User -> Yang Di Decline Requestnya

	// REMOVING CONNECT_REQUEST
	for i, val := range getUser.RequestConnect {
		fmt.Print("lolos")
		if val == user.ID {
			fmt.Print(val, user.ID)
			getUser.RequestConnect = lib.RemoveArrayByIndex(getUser.RequestConnect, i)
			getUser.RequestConnectTxt = lib.RemoveArrayByIndex(getUser.RequestConnectTxt, i)
			break
		}
	}

	err = r.DB.Save(getUser).Error
	if err != nil {
		return "Error", err
	}

	err = r.DB.Save(user).Error
	if err != nil {
		return "Error", err
	}

	return "Ok", r.DB.Save(user).Error
}
