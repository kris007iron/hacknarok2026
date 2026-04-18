use chrono::{NaiveDate, NaiveDateTime};
use serde::{Deserialize, Serialize};
use validator::Validate;
/*
#[derive(Debug, Deserialize, Validate)]
pub struct CreateProjectRequest {
    #[validate(length(
        min = 3,
        max = 50,
        message = "Projectname must be between 3 and 50 characters"
    ))]
    pub projectname: String,

    #[validate(email(message = "Invalid email format"))]
    pub email: String,

    #[validate(length(min = 8, message = "Password must be at least 8 characters"))]
    pub password: String,
}
*/

#[derive(Debug, Deserialize, Validate)]
pub struct CreateProjectRequest {
    pub name: String,
    pub repo_url: String,
    pub tags: String,
    pub description: String,
}

#[derive(Debug, Serialize)]
pub struct ProjectResponse {
    pub id: i32,
    pub name: Option<String>,
    pub date_added: NaiveDate,
    pub owner: Option<String>,
    pub photo_url: Option<String>,
    pub repo_url: Option<String>,
    pub tags: Option<String>,
    pub description: Option<String>,
    pub local_data_path: Option<String>,
    pub stars: Option<i64>,
    pub forks: Option<i64>,
    pub open_issues: Option<i64>,
    pub main_language: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
    pub last_synced_at: Option<NaiveDateTime>,
}

impl From<crate::models::Project> for ProjectResponse {
    fn from(project: crate::models::Project) -> Self {
        Self {
            id: project.id,
            name: project.name,
            date_added: project.date_added,
            owner: project.owner,
            photo_url: project.photo_url,
            repo_url: project.repo_url,
            tags: project.tags,
            description: project.description,
            local_data_path: project.local_data_path,
            stars: project.stars,
            forks: project.forks,
            open_issues: project.open_issues,
            main_language: project.main_language,
            created_at: project.created_at,
            updated_at: project.updated_at,
            last_synced_at: project.last_synced_at,
        }
    }
}
