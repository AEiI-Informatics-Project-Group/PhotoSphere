-- CREATE TABLE "reaction_comment"(
--                                    "id" BIGINT NOT NULL,
--                                    "user_id" BIGINT NOT NULL,
--                                    "comment_id" BIGINT NOT NULL,
--                                    "like" BOOLEAN NOT NULL,
--                                    "dislike" BOOLEAN NOT NULL,
--                                    "sad" BOOLEAN NOT NULL,
--                                    "funny" BOOLEAN NOT NULL,
--                                    "shock" BOOLEAN NOT NULL
-- );
-- ALTER TABLE
--     "reaction_comment" ADD PRIMARY KEY("id");
-- CREATE TABLE "post_tag"(
--                            "id" BIGINT NOT NULL,
--                            "post_id" BIGINT NOT NULL,
--                            "tag_id" BIGINT NOT NULL
-- );
-- ALTER TABLE
--     "post_tag" ADD PRIMARY KEY("id");
-- CREATE TABLE "location"(
--                            "id" BIGINT NOT NULL,
--                            "continent" VARCHAR(255) NOT NULL,
--                            "country" VARCHAR(255) NOT NULL,
--                            "town" VARCHAR(255) NOT NULL,
--                            "place" VARCHAR(255) NOT NULL
-- );
-- ALTER TABLE
--     "location" ADD PRIMARY KEY("id");
-- CREATE TABLE "user_image"(
--                              "id" BIGINT NOT NULL,
--                              "image_url" VARCHAR(255) NOT NULL
-- );
ALTER TABLE
    "user_image" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
                           "id" BIGINT NOT NULL,
                           "name" VARCHAR(255) NOT NULL,
                           "description" VARCHAR(255) NOT NULL
);
-- ALTER TABLE
--     "category" ADD PRIMARY KEY("id");
-- CREATE TABLE "image"(
--                         "id" BIGINT NOT NULL,
--                         "image_url" VARCHAR(255) NOT NULL
-- );
-- ALTER TABLE
--     "image" ADD PRIMARY KEY("id");
-- CREATE TABLE "tag"(
--                       "id" BIGINT NOT NULL,
--                       "name" VARCHAR(255) NOT NULL
-- );
-- ALTER TABLE
--     "tag" ADD PRIMARY KEY("id");
-- CREATE TABLE "reaction_post"(
--                                 "id" BIGINT NOT NULL,
--                                 "user_id" BIGINT NOT NULL,
--                                 "post_id" BIGINT NOT NULL,
--                                 "like" BOOLEAN NOT NULL,
--                                 "dislike" BOOLEAN NOT NULL,
--                                 "sad" BOOLEAN NOT NULL,
--                                 "funny" BOOLEAN NOT NULL,
--                                 "shock" BOOLEAN NOT NULL
-- );
-- ALTER TABLE
--     "reaction_post" ADD PRIMARY KEY("id");
-- CREATE TABLE "post"(
--                        "id" BIGINT NOT NULL,
--                        "image_id" BIGINT NOT NULL,
--                        "user_id" BIGINT NOT NULL,
--                        "category_id" BIGINT NOT NULL,
--                        "location_id" BIGINT NOT NULL,
--                        "comment_id" BIGINT NOT NULL,
--                        "title" VARCHAR(255) NOT NULL,
--                        "description" VARCHAR(255) NOT NULL,
--                        "date" DATE NOT NULL,
--                        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
--                        "views_quantity" BIGINT NOT NULL,
--                        "likes_quantity" BIGINT NOT NULL,
--                        "dislikes_quantity" BIGINT NOT NULL,
--                        "sad_quantity" BIGINT NOT NULL,
--                        "funny_quantity" BIGINT NOT NULL,
--                        "shock_quantity" BIGINT NOT NULL,
--                        "is_private" BOOLEAN NOT NULL
-- );
-- ALTER TABLE
--     "post" ADD PRIMARY KEY("id");
-- CREATE TABLE "comment"(
--                           "id" BIGINT NOT NULL,
--                           "user_id" BIGINT NOT NULL,
--                           "parent_comment_id" BIGINT,
--                           "comment_content" VARCHAR(255) NOT NULL,
--                           "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
--                           "likes_quantity" BIGINT NOT NULL,
--                           "dislikes_quantity" BIGINT NOT NULL,
--                           "sad_quantity" BIGINT NOT NULL,
--                           "funny_quantity" BIGINT NOT NULL,
--                           "shock_quantity" BIGINT NOT NULL
-- );
-- ALTER TABLE
--     "comment" ADD PRIMARY KEY("id");
-- CREATE TABLE "follow"(
--                          "id" BIGINT NOT NULL,
--                          "followed_id" BIGINT NOT NULL,
--                          "following_id" BIGINT NOT NULL
-- );
ALTER TABLE
    "follow" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
                       "id" BIGINT NOT NULL,
                       "username" VARCHAR(255) NOT NULL,
                       "first_name" VARCHAR(255) NOT NULL,
                       "last_name" VARCHAR(255) NOT NULL,
                       "email" VARCHAR(255) NOT NULL,
                       "password" VARCHAR(255) NOT NULL,
                       "gender" VARCHAR(255) NOT NULL,
                       "day_of_birth" DATE NOT NULL,
                       "image_id" BIGINT NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "post" ADD CONSTRAINT "post_comment_id_foreign" FOREIGN KEY("comment_id") REFERENCES "comment"("id");
ALTER TABLE
    "post" ADD CONSTRAINT "post_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");
ALTER TABLE
    "post_tag" ADD CONSTRAINT "post_tag_post_id_foreign" FOREIGN KEY("post_id") REFERENCES "post"("id");
ALTER TABLE
    "reaction_comment" ADD CONSTRAINT "reaction_comment_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_image_id_foreign" FOREIGN KEY("image_id") REFERENCES "user_image"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "follow" ADD CONSTRAINT "follow_following_id_foreign" FOREIGN KEY("following_id") REFERENCES "user"("id");
ALTER TABLE
    "post" ADD CONSTRAINT "post_image_id_foreign" FOREIGN KEY("image_id") REFERENCES "image"("id");
ALTER TABLE
    "reaction_post" ADD CONSTRAINT "reaction_post_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "post_tag" ADD CONSTRAINT "post_tag_tag_id_foreign" FOREIGN KEY("tag_id") REFERENCES "tag"("id");
ALTER TABLE
    "reaction_comment" ADD CONSTRAINT "reaction_comment_comment_id_foreign" FOREIGN KEY("comment_id") REFERENCES "comment"("id");
ALTER TABLE
    "reaction_post" ADD CONSTRAINT "reaction_post_post_id_foreign" FOREIGN KEY("post_id") REFERENCES "post"("id");
ALTER TABLE
    "post" ADD CONSTRAINT "post_location_id_foreign" FOREIGN KEY("location_id") REFERENCES "location"("id");
ALTER TABLE
    "follow" ADD CONSTRAINT "follow_followed_id_foreign" FOREIGN KEY("followed_id") REFERENCES "user"("id");
ALTER TABLE
    "post" ADD CONSTRAINT "post_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_parent_comment_id_foreign" FOREIGN KEY("parent_comment_id") REFERENCES "comment"("id");
