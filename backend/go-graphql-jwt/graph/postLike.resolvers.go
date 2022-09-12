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

	var postLike *model.PostLike
	err := r.DB.Where("post_id = ? AND user_id = ?", id, val.ID).Take(&postLike).Error

	if err == nil {
		// Dislike

		// Decrement like di post
		// var post *model.Post

		// if err := r.DB.First(&post, "id = ?", id).Error; err != nil {
		// 	return "Fail", err
		// }

		// post.Likes--
		// r.DB.Save(&post)

		postLike.IsLike = !postLike.IsLike
		return "Ok", r.DB.Save(&postLike).Error
	} else {
		// Like

		// Increment like di post
		// var post *model.Post

		// if err := r.DB.First(&post, "id = ?", id).Error; err != nil {
		// 	return "Fail", err
		// }

		// post.Likes++
		// r.DB.Save(&post)

		postLike.ID = uuid.NewString()
		postLike.PostID = id
		postLike.UserID = val.ID
		postLike.IsLike = true
		return "Ok", r.DB.Create(&postLike).Error
	}
}
