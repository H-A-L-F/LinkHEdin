package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"LinkHEdin/graph/model"
	middleware "LinkHEdin/middlewares"
	"context"

	"github.com/google/uuid"
)

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)

	var model *model.PostLike
	err := r.DB.Where("post_id = ? AND user_id = ?", id, val.ID).Take(&model).Error

	if err == nil {
		// Dislike
		model.IsLike = !model.IsLike
		return "Ok", r.DB.Save(&model).Error
	} else {
		// Like
		model.ID = uuid.NewString()
		model.PostID = id
		model.UserID = val.ID
		model.IsLike = true
		return "Ok", r.DB.Create(&model).Error
	}
}
