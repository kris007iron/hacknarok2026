use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectLanguageResponse {
    pub id: i32,
    pub project_id: Option<i32>,
    pub name: Option<String>,
    pub bytes: Option<i32>,
}

impl From<crate::models::ProjectLanguage> for ProjectLanguageResponse {
    fn from(project_language: crate::models::ProjectLanguage) -> Self {
        Self {
            id: project_language.id,
            project_id: project_language.project_id,
            name: project_language.name,
            bytes: project_language.bytes,
        }
    }
}
