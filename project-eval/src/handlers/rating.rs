use crate::{
    schemas::{RatingResponse, rating_schemas::CreateRatingRequest},
    state::{self, AppState},
};
use axum::{Json, extract::State, http::StatusCode};

pub async fn get_all_ratings(
    State(state): State<AppState>,
) -> Result<Json<Vec<RatingResponse>>, StatusCode> {
    let ratings = state
        .rating_repository
        .get_all_ratings()
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(
        ratings
            .into_iter()
            .map(RatingResponse::from)
            .collect::<Vec<_>>(),
    ))
}

pub async fn add_rating(
    State(state): State<AppState>,
    Json(payload): Json<CreateRatingRequest>,
) -> Result<Json<RatingResponse>, StatusCode> {
    let rating = state
        .rating_repository
        .create_rating(
            payload.project_id,
            payload.rating,
            &payload.description,
            payload.is_slop,
            payload.verified,
            payload.checker_id,
            Some(&payload.category),
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(RatingResponse::from(rating)))
}
