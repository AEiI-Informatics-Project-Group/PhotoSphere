-- Insert data into users table
INSERT INTO app_user (approved, day_of_birth, email, first_name, gender, last_name, role, username)
VALUES
    (TRUE, '2001-01-01', 'JohnDoe12@gmail.com', 'John', 'Male', 'Doe',  'USER', 'CrazyJohnny'),
    (TRUE, '1992-10-02', 'janejanejane@yahoo.com', 'Jane', 'Female', 'Smith', 'USER', 'JustJane777'),
    (TRUE, '2005-03-10', 'placeholder3@gmail.com', 'Michael', 'Male', 'Johnson',  'USER', 'placeholder3'),
    (TRUE, '1994-04-01', 'Emilly.Williams@icloud.com', 'Emily', 'Female', 'Williams', 'USER', 'ksjcnjfiuowurjh'),
    (TRUE, '1995-05-05', 'WhooperMAXXX@yahoo.com', 'Daniel', 'Male', 'Brown', 'USER', 'TooHotToHandle'),
    (TRUE, '1996-01-06', 'speedy@gmail.com', 'Gonzales', 'Male', 'Rodriguez',  'USER', 'SpeedyGonzales'),
    (TRUE, '1997-07-08', 'missymiss@hotmail.com', 'Melissa', 'Female', 'Garcia', 'USER', 'MissyMiss'),
    (TRUE, '1998-08-04', 'rockinrobin@yahoo.com', 'Robert', 'Male', 'Robinson', 'USER', 'RockingRobin'),
    (TRUE, '1999-09-01', 'dancequeen@gmail.com', 'Olivia', 'Female', 'Martinez', 'USER', 'DancingQueen'),
    (TRUE, '2000-04-10', 'starrynight@yahoo.com', 'Vincent', 'Male', 'Van Gogh', 'USER', 'StarryNight'),
    (TRUE, '1988-08-04', 'fancypants@icloud.com', 'Frank', 'Male', 'White', 'USER', 'FancyPants'),
    (TRUE, '1986-04-06', 'shiningstar@icloud.com', 'Samantha', 'Female', 'Johnson', 'USER', 'ShiningStar'),
    (TRUE, '1984-04-04', 'mightymouse@yahoo.com', 'Mark', 'Male', 'Taylor', 'USER', 'MightyMouse'),
    (TRUE, '1982-10-02', 'sparklingsoul@yahoo.com', 'Sara', 'Female', 'Anderson', 'USER', 'SparklingSoul'),
    (TRUE, '1989-10-08', 'goldenheart@gmail.com', 'Gary', 'Male', 'Brown', 'USER', 'GoldenHeart'),
    (TRUE, '1978-10-08', 'silverlining@icloud.com', 'Samantha', 'Female', 'White', 'USER', 'SilverLining'),
    (TRUE, '1996-08-10', 'rockstar@outlook.com', 'Robert', 'Male', 'Johnson', 'USER', 'RockStar'),
    (TRUE, '1974-04-10', 'divaqueen@outlook.com', 'Danielle', 'Female', 'Davis', 'USER', 'DivaQueen'),
    (TRUE, '2009-10-02', 'techieguy@outlook.com', 'Thomas', 'Male', 'Taylor', 'USER', 'TechieGuy'),
    (TRUE, '1971-04-08', 'fashionista@outlook.com', 'Fiona', 'Female', 'Fisher', 'USER', 'Fashionista');

-- Insert corresponding data into auth_user and refresh_token tables
INSERT INTO auth_user ("app_user", password)
VALUES
    ((SELECT id FROM app_user WHERE username = 'CrazyJohnny'), 'token123CrazyJohnny'),
    ((SELECT id FROM app_user WHERE username = 'JustJane777'), 'token123JustJane777'),
    ((SELECT id FROM app_user WHERE username = 'placeholder3'), 'token123placeholder3'),
    ((SELECT id FROM app_user WHERE username = 'ksjcnjfiuowurjh'), 'token123ksjcnjfiuowurjh'),
    ((SELECT id FROM app_user WHERE username = 'TooHotToHandle'), 'token123TooHotToHandle'),
    ((SELECT id FROM app_user WHERE username = 'SpeedyGonzales'), 'token123SpeedyGonzales'),
    ((SELECT id FROM app_user WHERE username = 'MissyMiss'), 'token123MissyMiss'),
    ((SELECT id FROM app_user WHERE username = 'RockingRobin'), 'token123RockingRobin'),
    ((SELECT id FROM app_user WHERE username = 'DancingQueen'), 'token123DancingQueen'),
    ((SELECT id FROM app_user WHERE username = 'StarryNight'), 'token123StarryNight'),
    ((SELECT id FROM app_user WHERE username = 'FancyPants'), 'token123FancyPants'),
    ((SELECT id FROM app_user WHERE username = 'ShiningStar'), 'token123ShiningStar'),
    ((SELECT id FROM app_user WHERE username = 'MightyMouse'), 'token123MightyMouse'),
    ((SELECT id FROM app_user WHERE username = 'SparklingSoul'), 'token123SparklingSoul'),
    ((SELECT id FROM app_user WHERE username = 'GoldenHeart'), 'token123GoldenHeart'),
    ((SELECT id FROM app_user WHERE username = 'SilverLining'), 'token123SilverLining'),
    ((SELECT id FROM app_user WHERE username = 'RockStar'), 'token123RockStar'),
    ((SELECT id FROM app_user WHERE username = 'DivaQueen'), 'token123DivaQueen'),
    ((SELECT id FROM app_user WHERE username = 'TechieGuy'), 'token123TechieGuy'),
    ((SELECT id FROM app_user WHERE username = 'Fashionista'), 'token123Fashionista');


INSERT INTO refresh_token (revoked, "app_user", token)
VALUES
    (FALSE, (SELECT id FROM app_user WHERE username = 'CrazyJohnny'), 'token123CrazyJohnny'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'JustJane777'), 'token123JustJane777'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'placeholder3'), 'token123placeholder3'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'ksjcnjfiuowurjh'), 'token123ksjcnjfiuowurjh'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'TooHotToHandle'), 'token123TooHotToHandle'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'SpeedyGonzales'), 'token123SpeedyGonzales'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'MissyMiss'), 'token123MissyMiss'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'RockingRobin'), 'token123RockingRobin'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'DancingQueen'), 'token123DancingQueen'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'StarryNight'), 'token123StarryNight'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'FancyPants'), 'token123FancyPants'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'ShiningStar'), 'token123ShiningStar'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'MightyMouse'), 'token123MightyMouse'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'SparklingSoul'), 'token123SparklingSoul'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'GoldenHeart'), 'token123GoldenHeart'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'SilverLining'), 'token123SilverLining'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'RockStar'), 'token123RockStar'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'DivaQueen'), 'token123DivaQueen'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'TechieGuy'), 'token123TechieGuy'),
    (FALSE, (SELECT id FROM app_user WHERE username = 'Fashionista'), 'token123Fashionista');