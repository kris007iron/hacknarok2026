use sqlx::mysql::MySqlPool;

use crate::repositories::{
    CommentRepository, ProjectLanguageRepository, ProjectRepository, RatingRepository,
    UserRepository,
};

#[derive(Clone)]
pub struct AppState {
    pub db: MySqlPool,
    pub user_repository: UserRepository,
    pub project_repository: ProjectRepository,
    pub rating_repository: RatingRepository,
    pub comment_repository: CommentRepository,
    pub project_language_repository: ProjectLanguageRepository,
}

impl AppState {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let db = MySqlPool::connect(database_url).await?;
        let user_repository = UserRepository::new(db.clone());
        let project_repository = ProjectRepository::new(db.clone());
        let rating_repository = RatingRepository::new(db.clone());
        let comment_repository = CommentRepository::new(db.clone());
        let project_language_repository = ProjectLanguageRepository::new(db.clone());

        Ok(Self {
            db,
            user_repository,
            project_repository,
            rating_repository,
            comment_repository,
            project_language_repository,
        })
    }
}
