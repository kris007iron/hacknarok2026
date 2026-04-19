use crate::models::ProjectCommit;
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct ProjectCommitRespository {
    db: MySqlPool,
}

impl ProjectCommitRespository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn find_by_project_id(&self, id: i32) -> Result<Vec<ProjectCommit>, sqlx::Error> {
        let user = sqlx::query_as::<_, ProjectCommit>(
            r#"
            SELECT *
            FROM projects_commits
            WHERE project_id = ?
            "#,
        )
        .bind(id)
        .fetch_all(&self.db)
        .await?;
        Ok(user)
    }
}
