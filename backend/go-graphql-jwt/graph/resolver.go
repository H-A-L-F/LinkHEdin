package graph

import (
	"gorm.io/gorm"
)

//go:generate go run github.com/99designs/gqlgen generate

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

// go get github.com/99designs/gqlgen@v0.17.14
// go get github.com/99designs/gqlgen/internal/imports@v0.17.14
// go get github.com/99designs/gqlgen/codegen/config@v0.17.14
// go get github.com/99designs/gqlgen/internal/imports@v0.17.14

type Resolver struct {
	DB *gorm.DB
}
