use axum::{
    Router,
    routing::{get, post},
};
use dotenvy;
use std::env;

mod handlers;
mod models;
mod repositories;
mod schemas;
mod state;

use handlers::auth::login;
use handlers::health::health_check;
use state::AppState;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    let connstr = env::var("DATABASE_URL").expect("No database config");

    let app_state = AppState::new(&connstr)
        .await
        .expect("Failed to connect to database");

    println!("Connected to database successfully!");

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/users/login", post(login))
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Server running on http://localhost:3000");

    axum::serve(listener, app).await.unwrap();
}
