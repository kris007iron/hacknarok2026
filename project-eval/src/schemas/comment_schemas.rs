use serde::{Deserialize, Serialize};
use validator::Validate;
/*
#[derive(Debug, Deserialize, Validate)]
pub struct CreateCommentRequest {
    #[validate(length(
        min = 3,
        max = 50,
        message = "Commentname must be between 3 and 50 characters"
    ))]
    pub commentname: String,

    #[validate(email(message = "Invalid email format"))]
    pub email: String,

    #[validate(length(min = 8, message = "Password must be at least 8 characters"))]
    pub password: String,
}
*/

#[derive(Debug, Deserialize, Validate)]
pub struct CreateCommentRequest {
    pub project_id: i32,
    #[validate(length(min = 1))]
    pub name: String,
    #[validate(length(min = 1))]
    pub description: String,
}

#[derive(Debug, Serialize)]
pub struct CommentResponse {
    pub id: i32,
    pub project_id: Option<i32>,
    pub name: Option<String>,
    pub description: Option<String>,
}

impl From<crate::models::Comment> for CommentResponse {
    fn from(comment: crate::models::Comment) -> Self {
        Self {
            id: comment.id,
            project_id: comment.project_id,
            name: comment.name,
            description: comment.description,
        }
    }
}
