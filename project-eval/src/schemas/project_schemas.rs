use chrono::NaiveDate;
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
pub struct LoginProjectRequest {
    #[validate(email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 1))]
    pub password: String,
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
        }
    }
}
