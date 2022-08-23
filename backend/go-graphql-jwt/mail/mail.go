package mail

import (
	"log"
	"strconv"

	"gopkg.in/gomail.v2"
)

//https://dasarpemrogramangolang.novalagung.com/C-send-email.html

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "LinkhedIn <bluejackslc221@gmail.com>"
const CONFIG_AUTH_EMAIL = "slcax221@gmail.com"
const CONFIG_AUTH_PASSWORD = "kpryfcefwyldlcix"

func SendVerification(link string, to string, code int) {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", to)
	mailer.SetHeader("Subject", "LinkhedIn Verification")
	body := "This is your verification link for LinkhedIn account " + link + "<br>Please enter your code: " + strconv.Itoa(code)
	mailer.SetBody("text/html", body)

	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)
	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("Mail sent!")
}

func SendPasswordRequest(link string, to string) {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", to)
	mailer.SetHeader("Subject", "LinkhedIn Verification")
	body := "This is change password request link for LinkhedIn acccount " + link
	mailer.SetBody("text/html", body)

	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)

	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Println("Mail sent!")
}
