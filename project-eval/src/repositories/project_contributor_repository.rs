use crate::models::ProjectContributor;
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct ProjectContributorRespository {
    db: MySqlPool,
}

impl ProjectContributorRespository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn find_by_project_id(
        &self,
        id: i32,
    ) -> Result<Vec<ProjectContributor>, sqlx::Error> {
        let user = sqlx::query_as::<_, ProjectContributor>(
            r#"
            SELECT *
            FROM projects_contributors
            WHERE project_id = ?
            "#,
        )
        .bind(id)
        .fetch_all(&self.db)
        .await?;
        Ok(user)
    }
}
