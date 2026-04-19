use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectContributor {
    pub id: i32,
    pub project_id: i32,
    pub login: String,
    pub avatar_url: Option<String>,
    pub html_url: Option<String>,
    pub contributions: i32,
}
