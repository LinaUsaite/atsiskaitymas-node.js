CREATE TABLE
    IF NOT EXISTS tours (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        duration INTEGER NOT NULL,
        max_group_size INTEGER NOT NULL,
        difficulty VARCHAR NOT NULL,
        ratings_average NUMERIC(2, 1) NOT NULL,
        ratings_quantity INTEGER NOT NULL,
        category_id VARCHAR NOT NULL,
        price NUMERIC(10, 2) NOT NULL
    );

CREATE TABLE 
    IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tours (
    name,
    duration,
    max_group_size,
    difficulty,
    ratings_average,
    ratings_quantity,
    category_id,
    price
)
SELECT
    'Tour #' || i,
    (random() * 14 + 1)::int,              -- duration: 1–15 days
    (random() * 20 + 5)::int,              -- group size: 5–25
    (ARRAY['easy','medium','difficult'])[floor(random()*3)+1],
    round((random() * 4 + 1)::numeric, 1), -- rating: 1.0–5.0
    (random() * 500)::int,                -- ratings count
    'cat_' || (floor(random()*5)+1),      -- category_id: cat_1–cat_5
    round((random() * 900 + 100)::numeric, 2) -- price: 100–1000
FROM generate_series(1, 100) AS i;