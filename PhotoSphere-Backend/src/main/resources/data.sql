INSERT INTO "user_image" ("id", "image_url")
VALUES
    (1, 'https://example.com/image1.jpg'),
    (2, 'https://example.com/image2.jpg'),
    (3, 'https://example.com/image3.jpg'),
    (4, 'https://example.com/image4.jpg'),
    (5, 'https://example.com/image5.jpg'),
    (6, 'https://example.com/image6.jpg'),
    (7, 'https://example.com/image7.jpg'),
    (8, 'https://example.com/image8.jpg'),
    (9, 'https://example.com/image9.jpg'),
    (10, 'https://example.com/image10.jpg');

INSERT INTO "user" ("id", "username", "first_name", "last_name", "email", "password", "gender", "day_of_birth", "image_id")
VALUES
    (1, 'user_1', 'John', 'Doe', 'user1@example.com', 'password123', 'Male', '1990-01-01', 1),
    (2, 'user_2', 'Jane', 'Smith', 'user2@example.com', 'password123', 'Female', '1992-02-02', 2),
    (3, 'user_3', 'Michael', 'Johnson', 'user3@example.com', 'password123', 'Male', '1993-03-03', 3),
    (4, 'user_4', 'Emily', 'Williams', 'user4@example.com', 'password123', 'Female', '1994-04-04', 4),
    (5, 'user_5', 'Daniel', 'Brown', 'user5@example.com', 'password123', 'Male', '1995-05-05', 5),
    (6, 'user_6', 'Olivia', 'Jones', 'user6@example.com', 'password123', 'Female', '1996-06-06', 6),
    (7, 'user_7', 'Liam', 'Davis', 'user7@example.com', 'password123', 'Male', '1997-07-07', 7),
    (8, 'user_8', 'Sophia', 'Garcia', 'user8@example.com', 'password123', 'Female', '1998-08-08', 8),
    (9, 'user_9', 'James', 'Martinez', 'user9@example.com', 'password123', 'Male', '1999-09-09', 9),
    (10, 'user_10', 'Ava', 'Rodriguez', 'user10@example.com', 'password123', 'Female', '2000-10-10', 10);

INSERT INTO "category" ("id", "name", "description")
VALUES
    (1, 'Technology', 'Tech news and updates'),
    (2, 'Science', 'Discoveries and research'),
    (3, 'Art', 'Artistic content'),
    (4, 'Sports', 'Sports-related news'),
    (5, 'Travel', 'Travel destinations and tips'),
    (6, 'Food', 'Recipes and food reviews'),
    (7, 'Health', 'Health and wellness tips'),
    (8, 'Music', 'Music and artists'),
    (9, 'Movies', 'Movies and reviews'),
    (10, 'Fashion', 'Fashion trends and styles');

INSERT INTO "image" ("id", "image_url")
VALUES
    (1, 'https://example.com/image1.jpg'),
    (2, 'https://example.com/image2.jpg'),
    (3, 'https://example.com/image3.jpg'),
    (4, 'https://example.com/image4.jpg'),
    (5, 'https://example.com/image5.jpg'),
    (6, 'https://example.com/image6.jpg'),
    (7, 'https://example.com/image7.jpg'),
    (8, 'https://example.com/image8.jpg'),
    (9, 'https://example.com/image9.jpg'),
    (10, 'https://example.com/image10.jpg');

INSERT INTO "location" ("id", "continent", "country", "town", "place")
VALUES
    (1, 'North America', 'USA', 'New York', 'Central Park'),
    (2, 'Europe', 'UK', 'London', 'Hyde Park'),
    (3, 'Asia', 'Japan', 'Tokyo', 'Shinjuku'),
    (4, 'South America', 'Brazil', 'Rio de Janeiro', 'Copacabana'),
    (5, 'Australia', 'Australia', 'Sydney', 'Bondi Beach'),
    (6, 'Africa', 'South Africa', 'Cape Town', 'Table Mountain'),
    (7, 'Antarctica', 'Antarctica', 'McMurdo Station', 'Ross Island'),
    (8, 'Europe', 'Germany', 'Berlin', 'Brandenburg Gate'),
    (9, 'North America', 'Canada', 'Toronto', 'CN Tower'),
    (10, 'Europe', 'France', 'Paris', 'Eiffel Tower');

INSERT INTO "comment" ("id", "user_id", "parent_comment_id", "comment_content", "created_at", "likes_quantity", "dislikes_quantity", "sad_quantity", "funny_quantity", "shock_quantity")
VALUES
    (1, 1, NULL, 'Great post!', '2024-01-01 10:05:00', 10, 2, 1, 5, 1),
    (2, 2, NULL, 'Very informative.', '2024-02-01 11:05:00', 15, 3, 2, 3, 2),
    (3, 3, 1, 'Amazing content!', '2024-03-01 12:05:00', 20, 4, 3, 7, 3),
    (4, 4, 1, 'Great sports coverage!', '2024-04-01 13:05:00', 25, 5, 4, 6, 4),
    (5, 5, 1, 'Loved the travel stories.', '2024-05-01 14:05:00', 30, 6, 5, 8, 5),
    (6, 6, 2, 'Delicious recipes!', '2024-06-01 15:05:00', 35, 7, 6, 9, 6),
    (7, 7, 3, 'Great health advice.', '2024-07-01 16:05:00', 40, 8, 7, 10, 7),
    (8, 8, 8, 'Love the music selection.', '2024-08-01 17:05:00', 45, 9, 8, 11, 8),
    (9, 9, 8, 'Enjoyed the movie reviews.', '2024-09-01 18:05:00', 50, 10, 9, 12, 9),
    (10, 10, 8, 'Fashion trends are on point!', '2024-10-01 19:05:00', 55, 11, 10, 13, 10);

INSERT INTO "post" ("id", "image_id", "user_id", "category_id", "location_id", "comment_id", "title", "description", "date", "created_at", "views_quantity", "likes_quantity", "dislikes_quantity", "sad_quantity", "funny_quantity", "shock_quantity", "is_private")
VALUES
    (1, 1, 1, 1, 1, 1, 'Tech Innovations', 'Exploring the latest in technology', '2024-01-01', '2024-01-01 10:00:00', 1000, 100, 10, 5, 20, 3, false),
    (2, 2, 2, 2, 2, 2, 'New Scientific Discoveries', 'Discussing new research', '2024-02-01', '2024-02-01 11:00:00', 2000, 200, 20, 10, 25, 5, false),
    (3, 3, 3, 3, 3, 3, 'Artistic Creations', 'Showcasing stunning art', '2024-03-01', '2024-03-01 12:00:00', 1500, 150, 15, 8, 30, 7, false),
    (4, 4, 4, 4, 4, 4, 'Sports Mania', 'Latest sports news and events', '2024-04-01', '2024-04-01 13:00:00', 2500, 300, 25, 12, 35, 10, false),
    (5, 5, 5, 5, 5, 5, 'Travel Adventures', 'Exploring amazing destinations', '2024-05-01', '2024-05-01 14:00:00', 3000, 350, 30, 15, 40, 15, false),
    (6, 6, 6, 6, 6, 6, 'Delicious Recipes', 'Sharing delicious food recipes', '2024-06-01', '2024-06-01 15:00:00', 2000, 250, 20, 10, 25, 10, false),
    (7, 7, 7, 7, 7, 7, 'Health Tips', 'Advice for a healthy lifestyle', '2024-07-01', '2024-07-01 16:00:00', 1500, 200, 15, 8, 30, 7, false),
    (8, 8, 8, 8, 8, 8, 'Music Hits', 'Top music and artists', '2024-08-01', '2024-08-01 17:00:00', 3000, 350, 25, 15, 40, 10, false),
    (9, 9, 9, 9, 9, 9, 'Movie Reviews', 'Reviews of the latest movies', '2024-09-01', '2024-09-01 18:00:00', 4000, 450, 30, 20, 50, 15, false),
    (10, 10, 10, 10, 10, 10, 'Fashion Trends', 'Latest fashion styles and trends', '2024-10-01', '2024-10-01 19:00:00', 3500, 400, 35, 25, 60, 20, false);

INSERT INTO "reaction_comment" ("id", "user_id", "comment_id", "like", "dislike", "sad", "funny", "shock")
VALUES
    (1, 2, 1, true, false, false, true, true),
    (2, 3, 2, true, false, true, false, false),
    (3, 4, 3, true, false, false, true, true),
    (4, 5, 4, true, false, true, false, true),
    (5, 6, 5, true, false, true, true, false),
    (6, 7, 6, true, true, true, false, false),
    (7, 8, 7, true, false, false, true, true),
    (8, 9, 8, true, false, true, true, true),
    (9, 10, 9, true, true, true, false, false),
    (10, 1, 10, true, false, true, true, true);

INSERT INTO "reaction_post" ("id", "user_id", "post_id", "like", "dislike", "sad", "funny", "shock")
VALUES
    (1, 2, 1, true, false, false, true, true),
    (2, 3, 2, true, false, true, false, true),
    (3, 4, 3, true, false, false, true, true),
    (4, 5, 4, true, true, true, false, true),
    (5, 6, 5, true, false, true, true, false),
    (6, 7, 6, true, true, false, true, true),
    (7, 8, 7, true, false, true, false, true),
    (8, 9, 8, true, false, true, true, true),
    (9, 10, 9, true, true, true, false, false),
    (10, 1, 10, true, false, true, true, true);

INSERT INTO "tag" ("id", "name")
VALUES
    (1, 'Technology'),
    (2, 'Science'),
    (3, 'Art'),
    (4, 'Sports'),
    (5, 'Travel'),
    (6, 'Food'),
    (7, 'Health'),
    (8, 'Music'),
    (9, 'Movies'),
    (10, 'Fashion');

INSERT INTO "post_tag" ("id", "post_id", "tag_id")
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3),
    (4, 4, 4),
    (5, 5, 5),
    (6, 6, 6),
    (7, 7, 7),
    (8, 8, 8),
    (9, 9, 9),
    (10, 10, 10);

INSERT INTO "follow" ("id", "followed_id", "following_id")
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 4),
    (4, 4, 5),
    (5, 5, 6),
    (6, 6, 7),
    (7, 7, 8),
    (8, 8, 9),
    (9, 9, 10),
    (10, 10, 1);
