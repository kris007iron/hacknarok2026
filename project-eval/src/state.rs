use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct AppState {
    pub db: MySqlPool,
}

impl AppState {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let db = MySqlPool::connect(database_url).await?;
        Ok(Self { db })
    }
}
