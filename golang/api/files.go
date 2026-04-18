package api

import (
	"encoding/json"
	"os"
	"path/filepath"
)

func SaveProjectDataToDisk(projectName string, data any) (string, error) {
	basePath := "/Users/kacperplis/Documents/hacknarok"

	projectFolder := filepath.Join(basePath, projectName)
	err := os.MkdirAll(projectFolder, os.ModePerm)
	if err != nil {
		return "", err
	}

	filePath := filepath.Join(projectFolder, "github_full_info.json")
	file, err := os.Create(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()
	
	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(data)
	if err != nil {
		return "", err
	}

	return projectFolder, nil
}
