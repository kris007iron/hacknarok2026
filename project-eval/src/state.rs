use sqlx::mysql::MySqlPool;

use crate::repositories::UserRepository;

#[derive(Clone)]
pub struct AppState {
    pub db: MySqlPool,
    pub user_repository: UserRepository,
}

impl AppState {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let db = MySqlPool::connect(database_url).await?;
        let user_repository = UserRepository::new(db.clone());

        Ok(Self {
            db,
            user_repository,
        })
    }
}
