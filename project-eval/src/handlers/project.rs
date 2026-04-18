use crate::{
    schemas::{ProjectLanguageResponse, ProjectResponse},
    state::AppState,
};
use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};
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

pub async fn get_project_language_by_id(
    State(state): State<AppState>,
    Path(project_id): Path<i32>,
) -> Result<Json<Vec<ProjectLanguageResponse>>, StatusCode> {
    let project_languages = state
        .project_language_repository
        .find_by_project_id(project_id)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    if project_languages.len() == 0 {
        return Err(StatusCode::NOT_FOUND);
    }
    Ok(Json(
        project_languages
            .into_iter()
            .map(ProjectLanguageResponse::from)
            .collect::<Vec<_>>(),
    ))
}
