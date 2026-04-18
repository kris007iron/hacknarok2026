use crate::{
    schemas::{LoginUserRequest, UserResponse},
    state::AppState,
};
use axum::{Json, extract::State, http::StatusCode};
use validator::Validate;
pub async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginUserRequest>,
) -> Result<Json<UserResponse>, StatusCode> {
    payload.validate().map_err(|_| StatusCode::BAD_REQUEST)?;
    println!("{}", &payload.email);

    let user = state
        .user_repository
        .find_by_email(&payload.email)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::UNAUTHORIZED)?;

    println!("{}", &payload.password);
    let password_valid = &payload.password == &user.password;
    if !password_valid {
        return Err(StatusCode::UNAUTHORIZED);
    }
    Ok(Json(UserResponse::from(user)))
}
