use crate::models::Comment;
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct CommentRepository {
    db: MySqlPool,
}

impl CommentRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn create_comment(
        &self,
        project_id: i32,
        name: &str,
        description: &str,
    ) -> Result<Comment, sqlx::Error> {
        let result = sqlx::query!(
            r#"
    INSERT INTO projects_comments (project_id, name, description)
    VALUES (?, ?, ?)
    "#,
            project_id,
            name,
            description
        )
        .execute(&self.db)
        .await?;

        let id = result.last_insert_id();

        let comment = sqlx::query_as::<_, Comment>(
            r#"
                SELECT id, project_id, name, description
                FROM projects_comments
                WHERE id = ?
                "#,
        )
        .bind(id)
        .fetch_one(&self.db)
        .await?;

        Ok(comment)
    }

    pub async fn get_all_comments(&self) -> Result<Vec<Comment>, sqlx::Error> {
        let ratings = sqlx::query_as!(
            Comment,
            r#"
        SELECT id, project_id, name, description
        FROM projects_comments
        "#
        )
        .fetch_all(&self.db)
        .await?;

        Ok(ratings)
    }
}
