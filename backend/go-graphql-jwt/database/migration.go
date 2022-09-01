package database

import (
	"LinkHEdin/graph/model"
)

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.UserValidation{})
	db.AutoMigrate(&model.ChangePasswordRequest{})
	db.AutoMigrate(&model.Education{})
	db.AutoMigrate(&model.Experience{})
	db.AutoMigrate(&model.ConnectRequest{})
	db.AutoMigrate(&model.Notification{})
	db.AutoMigrate(&model.Job{})
}
