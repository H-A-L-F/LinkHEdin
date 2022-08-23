package database

import (
	"LinkHEdin/graph/model"
)

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.UserValidation{})
	db.AutoMigrate(&model.ChangePasswordRequest{})
}
