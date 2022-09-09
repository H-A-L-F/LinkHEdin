package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"LinkHEdin/graph/model"
	"context"
	"fmt"
)

// CreateComment is the resolver for the createComment field.
func (r *mutationResolver) CreateComment(ctx context.Context, input model.NewComment) (string, error) {
	panic(fmt.Errorf("not implemented: CreateComment - createComment"))
}

// RepliesComment is the resolver for the repliesComment field.
func (r *mutationResolver) RepliesComment(ctx context.Context, input model.NewRepliesComment) (string, error) {
	panic(fmt.Errorf("not implemented: RepliesComment - repliesComment"))
}

// SeeCommentOnPost is the resolver for the seeCommentOnPost field.
func (r *queryResolver) SeeCommentOnPost(ctx context.Context, postID string, limit int, offset int) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: SeeCommentOnPost - seeCommentOnPost"))
}

// Comments is the resolver for the comments field.
func (r *queryResolver) Comments(ctx context.Context) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: Comments - comments"))
}
