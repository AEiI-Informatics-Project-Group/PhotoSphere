-- Insert sample users
INSERT INTO app_user (username, first_name, last_name, email, password, gender, day_of_birth, description, image)
VALUES
    ('CrazyJohnny', 'John', 'Doe', 'JohnDoe12@gmail.com', 'HardPASSword123', 'Male', '2001-01-01', 'Loves adventure sports and video games', null),
    ('JustJane777', 'Jane', 'Smith', 'janejanejane@yahoo.com', '777enajtsuj', 'Female', '1992-10-02', 'Avid reader and coffee enthusiast', null),
    ('placeholder3', 'Michael', 'Johnson', 'placeholder3@gmail.com', 'Michael9090', 'Male', '2005-03-10', 'Future software developer and tech geek', null),
    ('ksjcnjfiuowurjh', 'Emily', 'Williams', 'Emilly.Williams@icloud.com', 'sfwegset342@dew', 'Female', '1994-04-01', 'Aspiring artist with a passion for painting', null),
    ('TooHotToHandle', 'Daniel', 'Brown', 'WhooperMAXXX@yahoo.com', 'Daniel0505', 'Male', '1995-05-05', 'Fitness fanatic and personal trainer', null),
    ('SpeedyGonzales', 'Gonzales', 'Rodriguez', 'speedy@gmail.com', 'speedy123', 'Male', '1996-01-06', 'Competitive runner and sports enthusiast', null),
    ('MissyMiss', 'Melissa', 'Garcia', 'missymiss@hotmail.com', 'hello123', 'Female', '1997-07-08', 'Passionate about fashion and design', null),
    ('RockingRobin', 'Robert', 'Robinson', 'rockinrobin@yahoo.com', 'robinrocks', 'Male', '1998-08-04', 'Guitarist in a local band', null),
    ('DancingQueen', 'Olivia', 'Martinez', 'dancequeen@gmail.com', 'dancing321', 'Female', '1999-09-01', 'Loves dancing and choreography', null),
    ('StarryNight', 'Vincent', 'Van Gogh', 'starrynight@yahoo.com', 'vangogh1888', 'Male', '2000-04-10', 'Art lover and museum frequent visitor', null),
    ('FancyPants', 'Frank', 'White', 'fancypants@icloud.com', 'password123', 'Male', '1988-08-04', 'Loves luxury fashion and high-end accessories', null),
    ('ShiningStar', 'Samantha', 'Johnson', 'shiningstar@icloud.com', 'starshine123', 'Female', '1986-04-06', 'Volunteer and community service advocate', null),
    ('MightyMouse', 'Mark', 'Taylor', 'mightymouse@yahoo.com', 'mousepower123', 'Male', '1984-04-04', 'Cartoon lover and comic book collector', null),
    ('SparklingSoul', 'Sara', 'Anderson', 'sparklingsoul@yahoo.com', 'soulsparkle123', 'Female', '1982-10-02', 'Yoga instructor and wellness coach', null),
    ('GoldenHeart', 'Gary', 'Brown', 'goldenheart@gmail.com', 'heartofgold123', 'Male', '1989-10-08', 'Philanthropist with a heart of gold', null),
    ('SilverLining', 'Samantha', 'White', 'silverlining@icloud.com', 'silver123', 'Female', '1978-10-08', 'Positive thinker and motivational speaker', null),
    ('RockStar', 'Robert', 'Johnson', 'rockstar@outlook.com', 'rockon123', 'Male', '1996-08-10', 'Aspiring musician and rock enthusiast', null),
    ('DivaQueen', 'Danielle', 'Davis', 'divaqueen@outlook.com', 'divadiva444', 'Female', '1974-04-10', 'Loves singing and performing on stage', null),
    ('TechieGuy', 'Thomas', 'Taylor', 'techieguy@outlook.com', 'tech87281', 'Male', '2009-10-02', 'Gadget lover and tech wizard', null),
    ('Fashionista', 'Fiona', 'Fisher', 'fashionista@outlook.com', 'fashion000', 'Female', '1971-04-08', 'Fashion blogger and trendsetter', null),
    ('ArtisticAmy', 'Amy', 'Adams', 'amyadams@gmail.com', 'artislife123', 'Female', '1990-11-01', 'Graphic designer and digital artist', null),
    ('TechGuru', 'Jake', 'Jackson', 'jakej@gmail.com', 'tech1234', 'Male', '1985-12-02', 'IT consultant and tech guru', null),
    ('TravelerTom', 'Tom', 'Hanks', 'traveltom@yahoo.com', 'worldwide555', 'Male', '1975-09-12', 'World traveler and adventure seeker', null),
    ('NatureNancy', 'Nancy', 'Green', 'nancygreen@icloud.com', 'naturelover', 'Female', '1988-02-28', 'Nature enthusiast and wildlife photographer', null),
    ('FitnessFreak', 'Chris', 'Brown', 'chrisb@outlook.com', 'fitlife101', 'Male', '1991-06-15', 'Gym enthusiast and fitness coach', null),
    ('MusicMan', 'David', 'Bowie', 'davidb@music.com', 'rockstar789', 'Male', '1990-07-07', 'Musician and avid concert-goer', null);

-- Insert sample tags
INSERT INTO tag (name)
VALUES
    ('travel'),
    ('food'),
    ('lifestyle'),
    ('nature'),
    ('technology'),
    ('fitness'),
    ('music'),
    ('art');

-- Insert sample posts
INSERT INTO post (user_id, caption, image_url, category)
VALUES
    (1, 'A beautiful sunset!', null, 'Nature'),
    (2, 'Delicious meal!', null, 'Food'),
    (3, 'Exploring the mountains!', null, 'Travel'),
    (4, 'A day at the beach', null, 'Lifestyle'),
    (5, 'New tech gadget', null, 'Technology'),
    (6, 'Morning workout', null, 'Fitness'),
    (7, 'Rock concert!', null, 'Music'),
    (8, 'Art exhibition', null, 'Art'),
    (9, 'City skyline', null, 'Nature'),
    (10, 'Healthy breakfast', null, 'Food'),
    (11, 'Hiking adventure', null, 'Travel'),
    (12, 'Relaxing at home', null, 'Lifestyle'),
    (13, 'Latest smartphone', null, 'Technology'),
    (14, 'Evening yoga', null, 'Fitness'),
    (15, 'Jazz night', null, 'Music'),
    (16, 'Painting class', null, 'Art'),
    (17, 'Forest trail', null, 'Nature'),
    (18, 'Gourmet dinner', null, 'Food'),
    (19, 'Traveling by train', null, 'Travel'),
    (20, 'Chilling in the park', null, 'Lifestyle'),
    (21, 'Tech conference', null, 'Technology'),
    (22, 'Gym session', null, 'Fitness'),
    (23, 'Classical concert', null, 'Music'),
    (24, 'Sculpture exhibit', null, 'Art'),
    (25, 'Desert adventure', null, 'Nature');

-- Insert tags for posts
INSERT INTO post_tag (post_id, tag_id)
VALUES
    (1, (SELECT id FROM tag WHERE name = 'travel')),
    (1, (SELECT id FROM tag WHERE name = 'nature')),
    (2, (SELECT id FROM tag WHERE name = 'food')),
    (3, (SELECT id FROM tag WHERE name = 'travel')),
    (3, (SELECT id FROM tag WHERE name = 'nature')),
    (4, (SELECT id FROM tag WHERE name = 'lifestyle')),
    (5, (SELECT id FROM tag WHERE name = 'technology')),
    (6, (SELECT id FROM tag WHERE name = 'fitness')),
    (7, (SELECT id FROM tag WHERE name = 'music')),
    (8, (SELECT id FROM tag WHERE name = 'art')),
    (9, (SELECT id FROM tag WHERE name = 'nature')),
    (10, (SELECT id FROM tag WHERE name = 'food')),
    (11, (SELECT id FROM tag WHERE name = 'travel')),
    (12, (SELECT id FROM tag WHERE name = 'lifestyle')),
    (13, (SELECT id FROM tag WHERE name = 'technology')),
    (14, (SELECT id FROM tag WHERE name = 'fitness')),
    (15, (SELECT id FROM tag WHERE name = 'music')),
    (16, (SELECT id FROM tag WHERE name = 'art')),
    (17, (SELECT id FROM tag WHERE name = 'nature')),
    (18, (SELECT id FROM tag WHERE name = 'food')),
    (19, (SELECT id FROM tag WHERE name = 'travel')),
    (20, (SELECT id FROM tag WHERE name = 'lifestyle')),
    (21, (SELECT id FROM tag WHERE name = 'technology')),
    (22, (SELECT id FROM tag WHERE name = 'fitness')),
    (23, (SELECT id FROM tag WHERE name = 'music')),
    (24, (SELECT id FROM tag WHERE name = 'art')),
    (25, (SELECT id FROM tag WHERE name = 'nature'));

-- Insert sample comments
INSERT INTO comment (post_id, user_id, text)
VALUES
    (1, 2, 'Amazing view!'),
    (2, 1, 'Looks delicious!'),
    (3, 4, 'Love the mountains!'),
    (4, 3, 'Beach days are the best'),
    (5, 6, 'Need to get this gadget!'),
    (6, 5, 'Great workout routine!'),
    (7, 8, 'Rock on!'),
    (8, 7, 'Beautiful artwork!'),
    (9, 10, 'Stunning skyline!'),
    (10, 9, 'Healthy and tasty!'),
    (11, 12, 'Adventure awaits!'),
    (12, 11, 'Home sweet home!'),
    (13, 14, 'Must buy this!'),
    (14, 13, 'Feeling zen'),
    (15, 16, 'Amazing performance!'),
    (16, 15, 'Love this class!'),
    (17, 18, 'Nature at its best'),
    (18, 17, 'Gourmet indeed!'),
    (19, 20, 'Trains are the best way to travel'),
    (20, 19, 'Park life!'),
    (21, 22, 'Learned so much at the conference'),
    (22, 21, 'Pumped up!'),
    (23, 24, 'Classical music is timeless'),
    (24, 23, 'Sculptures are fascinating'),
    (25, 2, 'Desert adventures are thrilling');

-- Insert sample reactions
INSERT INTO post_reaction (post_id, user_id, reaction)
VALUES
    (1, 2, 'like'),
    (2, 1, 'like'),
    (1, 3, 'sad'),
    (2, 4, 'funny'),
    (3, 5, 'love'),
    (4, 6, 'like'),
    (5, 7, 'wow'),
    (6, 8, 'like'),
    (7, 9, 'haha'),
    (8, 10, 'love'),
    (9, 11, 'like'),
    (10, 12, 'sad'),
    (11, 13, 'funny'),
    (12, 14, 'love'),
    (13, 15, 'wow'),
    (14, 16, 'like'),
    (15, 17, 'haha'),
    (16, 18, 'love'),
    (17, 19, 'like'),
    (18, 20, 'sad'),
    (19, 21, 'funny'),
    (20, 22, 'love'),
    (21, 23, 'wow'),
    (22, 24, 'like'),
    (23, 25, 'haha'),
    (24, 1, 'love'),
    (25, 2, 'like');