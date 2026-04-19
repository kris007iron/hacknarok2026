use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Comment {
    pub id: i32,
    pub project_id: Option<i32>,
    pub name: Option<String>,
    pub description: Option<String>,
}
