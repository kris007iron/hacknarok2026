use crate::models::Rating;
use sqlx::{
    mysql::{MySqlPool, MySqlRow},
    query,
};

#[derive(Clone)]
pub struct RatingRepository {
    db: MySqlPool,
}

impl RatingRepository {
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
       ) -> Result<Rating, sqlx::Error> {
           let rating = sqlx::query_as::<_, Rating>(
               r#"
            INSERT INTO ratings (name, surname, email, password, photo_url)
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

           Ok(rating)
       }
    */
    pub async fn get_all_ratings(&self) -> Result<Vec<Rating>, sqlx::Error> {
        let ratings = sqlx::query_as!(
            Rating,
            r#"
        SELECT id, project_id, rating, description, is_slop, verified, checker_id, category
        FROM projects_ratings
        "#
        )
        .fetch_all(&self.db)
        .await?;

        Ok(ratings)
    }
    /*
    //TODO: update select
    pub async fn find_by_email(&self, email: &str) -> Result<Option<Rating>, sqlx::Error> {
        let rating = sqlx::query_as::<_, Rating>(
            r#"
            SELECT id, name, surname, email, password, role,
                      photo_url
            FROM ratings
            WHERE email = ?
            "#,
        )
        .bind(email)
        .fetch_optional(&self.db)
        .await?;
        Ok(rating)
    }
     */
}
