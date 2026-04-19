use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectCommitResponse {
    pub id: i32,
    pub project_id: i32,
    pub sha: String,
    pub message: String,
    pub author: String,
    pub date: NaiveDate,
    pub url: String,
}

impl From<crate::models::ProjectCommit> for ProjectCommitResponse {
    fn from(project_commit: crate::models::ProjectCommit) -> Self {
        Self {
            id: project_commit.id,
            project_id: project_commit.project_id,
            sha: project_commit.sha,
            message: project_commit.message,
            author: project_commit.author,
            date: project_commit.date,
            url: project_commit.url,
        }
    }
}
