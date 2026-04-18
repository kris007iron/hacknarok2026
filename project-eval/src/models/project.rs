use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Project {
    pub id: i32,
    pub name: Option<String>,
    pub date_added: NaiveDate,
    pub owner: Option<String>,
    pub photo_url: Option<String>,
    pub repo_url: Option<String>,
    pub tags: Option<String>,
    pub description: Option<String>,
}
