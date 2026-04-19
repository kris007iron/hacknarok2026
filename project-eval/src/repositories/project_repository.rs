use crate::models::Project;
use chrono::{NaiveDate, Utc};
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct ProjectRepository {
    db: MySqlPool,
}

impl ProjectRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }
    pub async fn create_project(
        &self,
        name: &str,
        repo_url: &str,
        tags: &str,
        description: &str,
    ) -> Result<Project, sqlx::Error> {
        let today: NaiveDate = Utc::now().date_naive();
        let result = sqlx::query!(
            r#"
            INSERT INTO projects (name, date_added, repo_url, tags, description)
            VALUES (?, ?, ?, ?, ?)
            "#,
            name,
            today,
            repo_url,
            tags,
            description,
        )
        .execute(&self.db)
        .await;
        println!("{:?}", result);
        let id = result?.last_insert_id();
        let project = sqlx::query_as::<_, Project>(
            r#"
            SELECT *
            FROM projects
            WHERE id = ?
            "#,
        )
        .bind(id)
        .fetch_one(&self.db)
        .await?;

        Ok(project)
    }

    pub async fn get_all_projects(&self) -> Result<Vec<Project>, sqlx::Error> {
        let projects = sqlx::query_as!(
            Project,
            r#"
        SELECT *
        FROM projects
        "#
        )
        .fetch_all(&self.db)
        .await?;

        Ok(projects)
    }
    /*
    //TODO: update select
    pub async fn find_by_email(&self, email: &str) -> Result<Option<Project>, sqlx::Error> {
        let project = sqlx::query_as::<_, Project>(
            r#"
            SELECT id, name, surname, email, password, role,
                      photo_url
            FROM projects
            WHERE email = ?
            "#,
        )
        .bind(email)
        .fetch_optional(&self.db)
        .await?;
        Ok(project)
    }
     */
}
