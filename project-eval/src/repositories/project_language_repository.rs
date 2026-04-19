use crate::models::ProjectLanguage;
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct ProjectLanguageRepository {
    db: MySqlPool,
}

impl ProjectLanguageRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn find_by_project_id(&self, id: i32) -> Result<Vec<ProjectLanguage>, sqlx::Error> {
        let user = sqlx::query_as::<_, ProjectLanguage>(
            r#"
            SELECT *
            FROM projects_languages
            WHERE project_id = ?
            "#,
        )
        .bind(id)
        .fetch_all(&self.db)
        .await?;
        Ok(user)
    }
}
