use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectCommit {
    pub id: i32,
    pub project_id: i32,
    pub sha: String,
    pub message: String,
    pub author: String,
    pub date: NaiveDate,
    pub url: String,
}
