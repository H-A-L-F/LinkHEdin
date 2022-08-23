package model

type UserValidation struct {
	ID     string `json:"id"`
	Link   string `json:"link"`
	Code   int    `json:"code"`
	UserID string `json:"user_id"`
	IsUsed bool   `json:"is_used"`
}
