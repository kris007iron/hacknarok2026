use crate::models::User;
use sqlx::mysql::{MySqlPool, MySqlRow};

#[derive(Clone)]
pub struct UserRepository {
    db: MySqlPool,
}

impl UserRepository {
    pub fn new(db: MySqlPool) -> Self {
        Self { db }
    }

    pub async fn create_user(
        &self,
        name: &str,
        surname: &str,
        email: &str,
        password: &str,
        photo: &str,
    ) -> Result<User, sqlx::Error> {
        let result = sqlx::query!(
            r#"
            INSERT INTO users (name, surname, email, password, photo_url)
            VALUES (?, ?, ?, ?, ?)
            "#,
            name,
            surname,
            email,
            password,
            photo
        )
        .execute(&self.db)
        .await?;

        let id = result.last_insert_id();

        let user = sqlx::query_as::<_, User>(
            r#"
            SELECT id, name, surname, email, password, role,
                      photo_url
            FROM users
            WHERE id = ?
            "#,
        )
        .bind(id)
        .fetch_one(&self.db)
        .await?;

        Ok(user)
    }

    //TODO: update select
    pub async fn find_by_email(&self, email: &str) -> Result<Option<User>, sqlx::Error> {
        let user = sqlx::query_as::<_, User>(
            r#"
            SELECT id, name, surname, email, password, role,
                      photo_url
            FROM users
            WHERE email = ?
            "#,
        )
        .bind(email)
        .fetch_optional(&self.db)
        .await?;
        Ok(user)
    }

    /*
       pub async fn find_by_id(&self, id: Uuid) -> Result<Option<User>, sqlx::Error> {
           let user = sqlx::query_as::<_, User>(
               r#"
            SELECT id, username, email, password_hash, bio, image,
                   created_at, updated_at
            FROM users
            WHERE id = $1
            "#,
           )
           .bind(id)
           .fetch_optional(&self.db)
           .await?;

           Ok(user)
       }

       pub async fn find_by_username(&self, username: &str) -> Result<Option<User>, sqlx::Error> {
           let user = sqlx::query_as::<_, User>(
               r#"
            SELECT id, username, email, password_hash, bio, image,
                   created_at, updated_at
            FROM users
            WHERE username = $1
            "#,
           )
           .bind(username)
           .fetch_optional(&self.db)
           .await?;

           Ok(user)
       }

       pub async fn update(
           &self,
           id: Uuid,
           username: Option<&str>,
           email: Option<&str>,
           bio: Option<&str>,
           image: Option<&str>,
       ) -> Result<Option<User>, sqlx::Error> {
           let user = sqlx::query_as::<_, User>(
               r#"
            UPDATE users
            SET username = COALESCE($2, username),
                email = COALESCE($3, email),
                bio = COALESCE($4, bio),
                image = COALESCE($5, image)
            WHERE id = $1
            RETURNING id, username, email, password_hash, bio, image,
                      created_at, updated_at
            "#,
           )
           .bind(id)
           .bind(username)
           .bind(email)
           .bind(bio)
           .bind(image)
           .fetch_optional(&self.db)
           .await?;

           Ok(user)
       }

    */
}
