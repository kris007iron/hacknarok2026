use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Rating {
    pub id: int,
    pub project_id: int,
    pub rating: int,
    pub description: String,
    pub is_slop: bool,
    pub verified: bool,
    pub checker_id: int,
    pub category: String,
}
