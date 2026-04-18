use crate::{
    schemas::{LoginUserRequest, RegisterUserRequest, UserResponse},
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
pub async fn register(
    State(state): State<AppState>,
    Json(payload): Json<RegisterUserRequest>,
) -> Result<Json<UserResponse>, StatusCode> {
    payload.validate().map_err(|_| StatusCode::BAD_REQUEST)?;

    // Check if user already exists
    let existing_user = state
        .user_repository
        .find_by_email(&payload.email)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if existing_user.is_some() {
        return Err(StatusCode::CONFLICT); // 409 - email already taken
    }

    // Create new user
    let user = state
        .user_repository
        .create_user(
            &payload.name,
            &payload.surname,
            &payload.email,
            &payload.password,
            &payload.photo_url,
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(UserResponse::from(user)))
}
