package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

type GitHubData struct {
	FullName    string `json:"full_name"`
	Stars       int    `json:"stargazers_count"`
	Description string `json:"description"`
}

func FetchGitHubInfo(repoURL string, token string) (*GithubRepoResp, error) {
	trimmedAddr := strings.TrimPrefix(repoURL, "https://github.com/")
	apiURL := "https://api.github.com/repos/" + trimmedAddr

	req, _ := http.NewRequest("GET", apiURL, nil)
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API error: %s", resp.Status)
	}

	var data GithubRepoResp
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	return &data, nil
}

type GithubCommitResp struct {
	SHA    string `json:"sha"`
	Commit struct {
		Author struct {
			Name string    `json:"name"`
			Date time.Time `json:"date"`
		} `json:"author"`
		Message string `json:"message"`
	} `json:"commit"`
	HTMLURL string `json:"html_url"`
}

type GithubRepoResp struct {
	FullName    string    `json:"full_name"`
	Description string    `json:"description"`
	Stars       int       `json:"stargazers_count"`
	Forks       int       `json:"forks_count"`
	OpenIssues  int       `json:"open_issues_count"`
	Language    string    `json:"language"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
