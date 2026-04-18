package api

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Note: .env file not found, using system env variables")
	}

	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
}

func GetAllProjects() ([]Project, error) {
	var projects []Project
	result := DB.Find(&projects)

	if result.Error != nil {
		return nil, result.Error
	}

	return projects, nil
}
