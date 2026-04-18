use crate::models::Project;
use sqlx::{
    mysql::{MySqlPool, MySqlRow},
    query,
};

#[derive(Clone)]
pub struct ProjectRepository {
    db: MySqlPool,
}

impl ProjectRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }
    /*
       pub async fn create(
           &self,
           name: &str,
           surname: &str,
           email: &str,
           password: &str,
           photo: &str,
       ) -> Result<Project, sqlx::Error> {
           let project = sqlx::query_as::<_, Project>(
               r#"
            INSERT INTO projects (name, surname, email, password, photo_url)
            VALUES (?, ?, ?, ?, ?)
            RETURNING id, name, surname, email, password, role,
                      photo_url
            "#,
           )
           .bind(name)
           .bind(surname)
           .bind(email)
           .bind(password)
           .bind(photo)
           .fetch_one(&self.db)
           .await?;

           Ok(project)
       }
    */
    pub async fn get_all_projects(&self) -> Result<Vec<Project>, sqlx::Error> {
        let projects = sqlx::query_as!(
            Project,
            r#"
        SELECT id, name, date_added, owner, photo_url, repo_url, tags, description
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
