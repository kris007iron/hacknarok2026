use crate::{
    schemas::{
        CreateProjectRequest, ProjectContributorResponse, ProjectLanguageResponse, ProjectResponse,
    },
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

pub async fn get_project_contributors_by_id(
    State(state): State<AppState>,
    Path(project_id): Path<i32>,
) -> Result<Json<Vec<ProjectContributorResponse>>, StatusCode> {
    let project_contributors = state
        .project_contributor_repository
        .find_by_project_id(project_id)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    if project_contributors.len() == 0 {
        return Err(StatusCode::NOT_FOUND);
    }
    Ok(Json(
        project_contributors
            .into_iter()
            .map(ProjectContributorResponse::from)
            .collect::<Vec<_>>(),
    ))
}

pub async fn add_project(
    State(state): State<AppState>,
    Json(payload): Json<CreateProjectRequest>,
) -> Result<Json<ProjectResponse>, StatusCode> {
    let project = state
        .project_repository
        .create_project(
            &payload.name,
            &payload.repo_url,
            &payload.tags,
            &payload.description,
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(ProjectResponse::from(project)))
}
