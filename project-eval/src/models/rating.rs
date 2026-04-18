use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Rating {
    pub id: i32,
    pub project_id: i32,
    pub rating: i32,
    pub description: String,
    pub is_slop: bool,
    pub verified: bool,
    pub checker_id: i32,
    pub category: String,
}
