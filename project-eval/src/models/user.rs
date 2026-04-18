use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: int,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub password: String,
    pub role: Role,
    pub photo_url: Option<String>,
}

enum Role {
    User,
    Checker,
    Admin,
}
