use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]
pub struct CreateRatingRequest {
    pub project_id: i32,
    pub rating: i32,
    pub description: String,
    pub is_slop: i8,
    pub verified: i8,
    pub checker_id: i32,
    pub category: String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct LoginRatingRequest {
    #[validate(email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 1))]
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct RatingResponse {
    pub id: i32,
    pub project_id: i32,
    pub rating: i32,
    pub description: Option<String>,
    pub is_slop: Option<i8>,
    pub verified: Option<i8>,
    pub checker_id: Option<i32>,
    pub category: Option<String>,
}

impl From<crate::models::Rating> for RatingResponse {
    fn from(rating: crate::models::Rating) -> Self {
        Self {
            id: rating.id,
            project_id: rating.project_id,
            rating: rating.rating,
            description: rating.description,
            is_slop: rating.is_slop,
            verified: rating.verified,
            checker_id: rating.checker_id,
            category: rating.category,
        }
    }
}
