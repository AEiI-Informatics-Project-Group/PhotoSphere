CREATE TABLE IF NOT EXISTS app_user
(
    id           BIGSERIAL PRIMARY KEY,
    username     VARCHAR(255) NOT NULL,
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    gender       VARCHAR(255),
    day_of_birth DATE,
    image        VARCHAR(255)
);