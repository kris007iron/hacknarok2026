package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"gorm.io/gorm/clause"
)

type GitHubService struct {
	Token string
}

func (s *GitHubService) SyncFullProject(p *Project) error {
	ghData, err := FetchGitHubInfo(p.RepoUrl, s.Token)
	if err != nil {
		return fmt.Errorf("błąd pobierania info: %v", err)
	}

	p.Owner = ghData.Owner.Login
	p.Stars = uint(ghData.Stars)
	p.Forks = uint(ghData.Forks)
	p.OpenIssues = uint(ghData.OpenIssues)
	p.MainLanguage = ghData.Language
	p.CreatedAt = ghData.CreatedAt
	p.UpdatedAt = ghData.UpdatedAt
	p.LastSyncedAt = time.Now()

	if err := DB.Save(&p).Error; err != nil {
		return fmt.Errorf("błąd zapisu projektu: %v", err)
	}

	if err := s.fetchAndSaveCommits(p.ID, p.RepoUrl); err != nil {
		fmt.Printf("Błąd commitów dla %s: %v\n", p.Name, err)
	}

	if err := s.fetchAndSaveLanguages(p.ID, p.RepoUrl); err != nil {
		fmt.Printf("Błąd języków dla %s: %v\n", p.Name, err)
	}

	if err := s.fetchAndSaveContributors(p.ID, p.RepoUrl); err != nil {
		fmt.Printf("Błąd kontrybutorów dla %s: %v\n", p.Name, err)
	}

	return nil
}

func (s *GitHubService) fetchAndSaveCommits(projectID uint, repoURL string) error {
	trimmedAddr := strings.TrimPrefix(repoURL, "https://github.com/")
	apiURL := fmt.Sprintf("https://api.github.com/repos/%s/commits?per_page=10", trimmedAddr)

	req, _ := http.NewRequest("GET", apiURL, nil)
	if s.Token != "" {
		req.Header.Set("Authorization", "Bearer "+s.Token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("GitHub API returned status: %d", resp.StatusCode)
	}

	var githubCommits []GithubCommitResp
	if err := json.NewDecoder(resp.Body).Decode(&githubCommits); err != nil {
		return err
	}

	for _, gc := range githubCommits {
		commitModel := ProjectCommit{
			ProjectID: projectID,
			SHA:       gc.SHA,
			Message:   gc.Commit.Message,
			Author:    gc.Commit.Author.Name,
			Date:      gc.Commit.Author.Date,
			Url:       gc.HTMLURL,
		}

		DB.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "sha"}},
			DoNothing: true,
		}).Create(&commitModel)
	}
	return nil
}

func (s *GitHubService) fetchAndSaveLanguages(projectID uint, repoURL string) error {
	trimmedAddr := strings.TrimPrefix(repoURL, "https://github.com/")
	apiURL := fmt.Sprintf("https://api.github.com/repos/%s/languages", trimmedAddr)

	req, _ := http.NewRequest("GET", apiURL, nil)
	if s.Token != "" {
		req.Header.Set("Authorization", "Bearer "+s.Token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var langData map[string]int
	if err := json.NewDecoder(resp.Body).Decode(&langData); err != nil {
		return err
	}

	DB.Where("project_id = ?", projectID).Delete(&ProjectLanguage{})

	for name, bytes := range langData {
		lang := ProjectLanguage{
			ProjectID: projectID,
			Name:      name,
			Bytes:     bytes,
		}
		DB.Create(&lang)
	}
	return nil
}

func (s *GitHubService) fetchAndSaveContributors(projectID uint, repoURL string) error {
	trimmedAddr := strings.TrimPrefix(repoURL, "https://github.com/")
	apiURL := fmt.Sprintf("https://api.github.com/repos/%s/contributors", trimmedAddr)

	req, _ := http.NewRequest("GET", apiURL, nil)
	if s.Token != "" {
		req.Header.Set("Authorization", "Bearer "+s.Token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var ghContributors []struct {
		Login         string `json:"login"`
		AvatarUrl     string `json:"avatar_url"`
		HtmlUrl       string `json:"html_url"`
		Contributions int    `json:"contributions"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&ghContributors); err != nil {
		return err
	}

	DB.Where("project_id = ?", projectID).Delete(&ProjectContributor{})

	for _, c := range ghContributors {
		contributor := ProjectContributor{
			ProjectID:     projectID,
			Login:         c.Login,
			AvatarUrl:     c.AvatarUrl,
			HtmlUrl:       c.HtmlUrl,
			Contributions: c.Contributions,
		}
		DB.Create(&contributor)
	}
	return nil
}

func GetPendingProjects() ([]Project, error) {
	var projects []Project
	err := DB.Where("last_synced_at IS NULL").Limit(10).Find(&projects).Error
	return projects, err
}
