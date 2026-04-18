use crate::{schemas::ProjectResponse, state::AppState};
use axum::{Json, extract::State, http::StatusCode};
pub async fn get_all_projects(
    State(state): State<AppState>,
) -> Result<Json<Vec<ProjectResponse>>, StatusCode> {
    let projects = state
        .project_repository
        .get_all_projects()
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(
        projects
            .into_iter()
            .map(ProjectResponse::from)
            .collect::<Vec<_>>(),
    ))
}
