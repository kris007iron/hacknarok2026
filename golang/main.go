package main

import (
	"golang/api"
	"log"
	"os"
)

func main() {
	// 1. Inicjalizacja bazy danych
	api.InitDB()

	// 2. Inicjalizacja serwisu GitHub
	ghService := &api.GitHubService{
		Token: os.Getenv("GITHUB_TOKEN"),
	}

	// 3. POBIERZ PROJEKTY Z BAZY (używamy funkcji GetAllProjects, którą masz w handlers.go)
	projects, err := api.GetAllProjects()
	if err != nil {
		log.Fatal("Nie udało się pobrać projektów z bazy:", err)
	}

	for i := range projects {
		err := ghService.SyncFullProject(&projects[i])

		if err != nil {
			log.Printf("Błąd synchronizacji %s: %v", projects[i].Name, err)
			continue
		}
		log.Printf("Projekt %s zsynchronizowany pomyślnie", projects[i].Name)
	}
}
