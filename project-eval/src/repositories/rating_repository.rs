use crate::models::Rating;
use sqlx::mysql::MySqlPool;

#[derive(Clone)]
pub struct RatingRepository {
    db: MySqlPool,
}

impl RatingRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn create_rating(
        &self,
        project_id: i32,
        rating: i32,
        description: &str,
        is_slop: i8,
        verified: i8,
        checker_id: i32,
        category: Option<&str>,
    ) -> Result<Rating, sqlx::Error> {
        let result = sqlx::query!(
            r#"
            INSERT INTO projects_ratings (project_id, rating, description, is_slop, verified, checker_id, category)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            "#,
            project_id,
            rating,
            description,
            is_slop,
            0,
            checker_id,
            category
        )
        .execute(&self.db)
        .await;

        println!("{:?}", result);

        let id = result?.last_insert_id();

        let rating = sqlx::query_as::<_, Rating>(
            r#"
            SELECT *
            FROM projects_ratings
            WHERE id = ?
            "#,
        )
        .bind(id)
        .fetch_one((&self.db))
        .await;

        println!("{:?}", rating);

        Ok(rating?)
    }

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
