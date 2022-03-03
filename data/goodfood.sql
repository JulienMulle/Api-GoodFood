DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "recipe" CASCADE;
DROP TABLE IF EXISTS "ingredient" CASCADE;
DROP TABLE IF EXISTS "item" CASCADE;
DROP TABLE IF EXISTS "category" CASCADE;
DROP TABLE IF EXISTS "item_recipe" CASCADE;
DROP TABLE IF EXISTS "category_item" CASCADE;
DROP TABLE IF EXISTS "recipe_category" CASCADE;


CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "recipe"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "ingredient" TEXT [],
    "description" TEXT,
    "picture" VARCHAR,
    "user_id" INTEGER REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "category"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "user_id" INTEGER REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "item"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "user_id" INTEGER REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "item_recipe"(
    "recipe_id" INTEGER REFERENCES "recipe"("id"),
    "item_id" INTEGER REFERENCES "item"("id"),
    "quantity" NUMERIC,
    "unit" NUMERIC,
    PRIMARY KEY ("item_id", "recipe_id")
);

CREATE TABLE IF NOT EXISTS "category_item"(
    "item_id" INTEGER REFERENCES "item"("id"),
    "category_id" INTEGER REFERENCES "category"("id"),
    PRIMARY KEY ("category_id", "item_id")
);

CREATE TABLE IF NOT EXISTS "recipe_category"(
    "recipe_id" INTEGER REFERENCES "recipe"("id"),
    "category_id" INTEGER REFERENCES "category"("id"),
    PRIMARY KEY ("category_id", "recipe_id")
);

