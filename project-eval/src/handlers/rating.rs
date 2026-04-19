use crate::{schemas::RatingResponse, state::AppState};
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
