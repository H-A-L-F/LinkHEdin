package database

import (
	"LinkHEdin/graph/model"
)

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
}
