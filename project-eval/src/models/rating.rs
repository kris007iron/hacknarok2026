use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Rating {
    pub id: i32,
    pub project_id: i32,
    pub rating: i32,
    pub description: Option<String>,
    pub is_slop: Option<i8>,
    pub verified: Option<i8>,
    pub checker_id: Option<i32>,
    pub category: Option<String>,
}
