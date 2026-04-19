use axum::{
    Router,
    http::{HeaderValue, Method, header},
    routing::{get, post},
};
use axum::{response::IntoResponse, routing::options};
use dotenvy;
use std::env;
use tower_http::cors::{Any, CorsLayer};

mod handlers;
mod models;
mod repositories;
mod schemas;
mod state;

use handlers::auth::login;
use handlers::comment::{add_comment, get_all_comments};
use handlers::health::health_check;
use handlers::project::{get_all_projects, get_project_language_by_id};
use handlers::rating::get_all_ratings;
use state::AppState;

use crate::handlers::{
    auth::register,
    project::{add_project, get_project_contributors_by_id},
};

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    let connstr = env::var("DATABASE_URL").expect("No database config");

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION, header::ACCEPT])
        .allow_credentials(true);

    let app_state = AppState::new(&connstr)
        .await
        .expect("Failed to connect to database");

    println!("Connected to database successfully!");

    let app = Router::new()
        .route("/health", get(health_check))
        // .route("/api/users/login", options(options_handler))
        .route("/api/users/login", post(login))
        .route("/api/users/register", post(register))
        .route("/api/projects", get(get_all_projects))
        .route("/api/projects", post(add_project))
        .route(
            "/api/projects/{project_id}/languages",
            get(get_project_language_by_id),
        )
        .route(
            "/api/projects/{project_id}/contributors",
            get(get_project_contributors_by_id),
        )
        .route("/api/ratings", get(get_all_ratings))
        .route("/api/comments", get(get_all_comments))
        .route("/api/comments", post(add_comment))
        .layer(cors)
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Server running on http://localhost:3000");

    axum::serve(listener, app).await.unwrap();
}
