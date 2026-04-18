use sqlx::mysql::MySqlPool;

use crate::{
    models::User,
    repositories::{ProjectRepository, UserRepository, project_repository},
};

#[derive(Clone)]
pub struct AppState {
    pub db: MySqlPool,
    pub user_repository: UserRepository,
    pub project_repository: ProjectRepository,
}

impl AppState {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let db = MySqlPool::connect(database_url).await?;
        let user_repository = UserRepository::new(db.clone());
        let project_repository = ProjectRepository::new(db.clone());

        Ok(Self {
            db,
            user_repository,
            project_repository,
        })
    }
}
