use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub password: String,
    pub role: String,
    pub photo_url: Option<String>,
}

#[derive(Clone, Debug, PartialEq, PartialOrd, Deserialize, Serialize, sqlx::Type)]
#[sqlx(rename_all = "lowercase")]
pub enum Role {
    User,
    Checker,
    Admin,
}
