// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AllUpdateUser struct {
	Name string `json:"name"`
}

type GoogleInput struct {
	GoogleID  string `json:"googleId"`
	GoogleKey string `json:"googleKey"`
	Email     string `json:"email"`
	Name      string `json:"name"`
}

type InputNotification struct {
	UserID         string `json:"userId"`
	Text           string `json:"text"`
	SenderName     string `json:"senderName"`
	SenderPhotoURL string `json:"senderPhotoUrl"`
	Link           string `json:"link"`
}

type JobInput struct {
	Title        string `json:"title"`
	CompanyName  string `json:"companyName"`
	Location     string `json:"location"`
	PhotoProfile string `json:"photoProfile"`
}

type NewLink struct {
	Link   string `json:"link"`
	Code   int    `json:"code"`
	UserID string `json:"user_id"`
}

type NewPost struct {
	Text           string   `json:"text"`
	UserID         string   `json:"user_id"`
	AttachmentLink string   `json:"attachment_link"`
	Hashtag        []string `json:"hashtag"`
	AttachmentType string   `json:"attachment_type"`
}

type NewUser struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type Search struct {
	Post []*Post `json:"post"`
	User []*User `json:"user"`
}

type UpdateUser struct {
	Name           string `json:"Name"`
	Email          string `json:"Email"`
	PhotoProfile   string `json:"PhotoProfile"`
	Headline       string `json:"Headline"`
	BgPhotoProfile string `json:"BgPhotoProfile"`
}

type ValidChangePass struct {
	ID   string `json:"id"`
	Code int    `json:"code"`
}

type ValidReq struct {
	ID   string `json:"id"`
	Code int    `json:"code"`
}

type NewComment struct {
	UserID string `json:"UserId"`
	Text   string `json:"Text"`
	PostID string `json:"PostId"`
}

type NewEducation struct {
	UserID       string  `json:"UserID"`
	School       string  `json:"School"`
	Degree       string  `json:"Degree"`
	FieldOfStudy string  `json:"FieldOfStudy"`
	StartDate    string  `json:"StartDate"`
	EndDate      string  `json:"EndDate"`
	Grade        float64 `json:"Grade"`
	Activities   string  `json:"Activities"`
	Description  string  `json:"Description"`
}

type NewExperience struct {
	UserID         string `json:"UserID"`
	Title          string `json:"Title"`
	EmploymentType string `json:"EmploymentType"`
	CompanyName    string `json:"CompanyName"`
	Location       string `json:"Location"`
	Active         bool   `json:"Active"`
	StartYear      string `json:"StartYear"`
	EndYear        string `json:"EndYear"`
	Industry       string `json:"Industry"`
	Description    string `json:"Description"`
}

type NewRepliesComment struct {
	CommentID string `json:"CommentId"`
	Text      string `json:"Text"`
	UserID    string `json:"UserId"`
}
