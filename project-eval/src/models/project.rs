use chrono::{NaiveDate, NaiveDateTime};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

//TODO: update this model
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
    pub local_data_path: Option<String>,
    pub stars: Option<i64>,
    pub forks: Option<i64>,
    pub open_issues: Option<i64>,
    pub main_language: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
    pub last_synced_at: Option<NaiveDateTime>,
}
