package main

import (
	"golang/api"
	"log"
	"os"
	"time"
)

func main() {
	api.InitDB()
	ghService := &api.GitHubService{Token: os.Getenv("GITHUB_TOKEN")}

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	log.Println("Serwis monitorujący uruchomiony. Oczekiwanie na dane...")

	for range ticker.C {
		projects, err := api.GetPendingProjects()
		if err != nil {
			log.Printf("Błąd bazy: %v", err)
			continue
		}

		if len(projects) == 0 {
			continue
		}

		for i := range projects {
			log.Printf("Przetwarzanie projektu: %s...", projects[i].Name)

			err := ghService.SyncFullProject(&projects[i])
			if err != nil {
				log.Printf("Błąd synchronizacji %s: %v", projects[i].Name, err)
				continue
			}
			log.Printf("Sukces: %s", projects[i].Name)
		}
	}
}
