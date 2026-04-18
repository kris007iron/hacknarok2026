package api

import (
	"time"
)

type Project struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	Name    string `json:"name"`
	RepoUrl string `json:"repo_url"`

	Stars        uint   `json:"stars"`
	Forks        uint   `json:"forks"`
	OpenIssues   uint   `json:"open_issues"`
	MainLanguage string `json:"main_language"`

	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	LastSyncedAt time.Time `json:"last_synced_at"`

	Commits      []ProjectCommit      `json:"commits"`
	Languages    []ProjectLanguage    `json:"languages"`
	Contributors []ProjectContributor `json:"contributors" gorm:"foreignKey:ProjectID"`
}

type ProjectCommit struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ProjectID uint      `json:"project_id" gorm:"index"`
	SHA       string    `json:"sha" gorm:"uniqueIndex"`
	Message   string    `json:"message"`
	Author    string    `json:"author"`
	Date      time.Time `json:"date"`
	Url       string    `json:"url"`
}

type ProjectLanguage struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	ProjectID uint   `json:"project_id" gorm:"index"`
	Name      string `json:"name"`
	Bytes     int    `json:"bytes"`
}

type ProjectContributor struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	ProjectID     uint   `json:"project_id" gorm:"index"`
	Login         string `json:"login"`
	AvatarUrl     string `json:"avatar_url"`
	HtmlUrl       string `json:"html_url"`
	Contributions int    `json:"contributions"`
}

func (ProjectCommit) TableName() string {
	return "projects_commits"
}
func (ProjectLanguage) TableName() string {
	return "projects_languages"
}
func (ProjectContributor) TableName() string { return "projects_contributors" }

type JsonResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}
