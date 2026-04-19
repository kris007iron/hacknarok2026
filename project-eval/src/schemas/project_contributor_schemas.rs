use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectContributorResponse {
    pub id: i32,
    pub project_id: i32,
    pub login: String,
    pub avatar_url: Option<String>,
    pub html_url: Option<String>,
    pub contributions: i32,
}

impl From<crate::models::ProjectContributor> for ProjectContributorResponse {
    fn from(project_contributor: crate::models::ProjectContributor) -> Self {
        Self {
            id: project_contributor.id,
            project_id: project_contributor.project_id,
            login: project_contributor.login,
            avatar_url: project_contributor.avatar_url,
            html_url: project_contributor.html_url,
            contributions: project_contributor.contributions,
        }
    }
}
