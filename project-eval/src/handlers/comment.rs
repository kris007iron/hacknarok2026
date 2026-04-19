use crate::{
    schemas::{CommentResponse, CreateCommentRequest},
    state::AppState,
};
use axum::{Json, extract::State, http::StatusCode};
use validator::Validate;

pub async fn get_all_comments(
    State(state): State<AppState>,
) -> Result<Json<Vec<CommentResponse>>, StatusCode> {
    let comments = state
        .comment_repository
        .get_all_comments()
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(
        comments
            .into_iter()
            .map(CommentResponse::from)
            .collect::<Vec<_>>(),
    ))
}

pub async fn add_comment(
    State(state): State<AppState>,
    Json(payload): Json<CreateCommentRequest>,
) -> Result<Json<CommentResponse>, StatusCode> {
    payload.validate().map_err(|_| StatusCode::BAD_REQUEST)?;

    let comment = state
        .comment_repository
        .create_comment(payload.project_id, &payload.name, &payload.description)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(CommentResponse::from(comment)))
}
