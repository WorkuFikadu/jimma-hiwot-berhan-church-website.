CREATE DATABASE IF NOT EXISTS jimma_church CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jimma_church;

CREATE TABLE IF NOT EXISTS sermons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL, speaker VARCHAR(255) NOT NULL,
  description TEXT, date DATE NOT NULL,
  video_url VARCHAR(500), audio_url VARCHAR(500), image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL, description TEXT,
  event_date DATE NOT NULL, location VARCHAR(255), image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS prayer_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL,
  request TEXT NOT NULL, is_confidential TINYINT(1) DEFAULT 0,
  is_answered TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,
  subject VARCHAR(255), message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ministries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, description TEXT,
  leader VARCHAR(255), meeting_day VARCHAR(255), icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, role VARCHAR(255),
  content TEXT NOT NULL, image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS weekly_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, day VARCHAR(100) NOT NULL,
  time VARCHAR(100) NOT NULL, description TEXT, sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data
INSERT INTO sermons (title, speaker, description, date, video_url) VALUES
('The Power of Faith', 'Pastor Abraham Tadesse', 'Discover how unwavering faith can move mountains and transform your life. Drawing from Hebrews 11, we explore the stories of those who walked by faith and saw God''s promises fulfilled in extraordinary ways.', '2026-03-29', 'https://www.youtube.com/embed/z16qLaRTXdo'),
('Walking in God''s Love', 'Pastor Samuel Kebede', 'A deep exploration of 1 Corinthians 13 and what it truly means to love as God loves. This sermon challenges us to examine our hearts and embrace the selfless, sacrificial love of Christ in our daily relationships and community interactions.', '2026-03-22', 'https://www.youtube.com/embed/z16qLaRTXdo'),
('Overcoming Adversity', 'Evangelist Mariam Teshome', 'Finding strength in God during difficult times. Through the story of Job, we learn that our trials are not punishments but opportunities for God to demonstrate His faithfulness and for our faith to be refined like gold.', '2026-03-15', 'https://www.youtube.com/embed/z16qLaRTXdo'),
('The Beatitudes: Blessed Are the Peacemakers', 'Pastor Abraham Tadesse', 'An in-depth study of Matthew 5:9 and the call to be peacemakers in a world filled with conflict. Learn practical ways to bring God''s peace to your family, workplace, and community through Christ-centered reconciliation.', '2026-03-08', 'https://www.youtube.com/embed/z16qLaRTXdo'),
('Living with Purpose', 'Pastor Samuel Kebede', 'Understanding God''s unique purpose for your life. This sermon examines the life of Esther and how God positions each of us for such a time as this — encouraging you to step boldly into the calling God has placed on your life.', '2026-03-01', 'https://www.youtube.com/embed/z16qLaRTXdo'),
('The Grace of Giving', 'Evangelist Mariam Teshome', 'Exploring the biblical principles of generosity and how giving transforms both the giver and the receiver. A practical guide to tithes, offerings, and cheerful giving rooted in 2 Corinthians 9:7.', '2026-02-22', 'https://www.youtube.com/embed/z16qLaRTXdo');

INSERT INTO events (title, description, event_date, location) VALUES
('Easter Sunday Celebration', 'Join us for a special Easter worship service celebrating the resurrection of our Lord Jesus Christ. The service will feature praise and worship, a powerful message from Pastor Abraham, special communion, and a time of fellowship afterward. All are welcome to celebrate this glorious day with us.', '2026-04-12', 'Main Sanctuary, Jimma Hiwot Berhan Church'),
('Youth Conference 2026', 'A three-day youth conference themed "Arise and Shine" featuring guest speakers from across Ethiopia, anointed worship sessions, practical workshops on leadership and faith, fellowship activities, and community service projects for young people ages 15-35.', '2026-05-02', 'Fellowship Hall, Jimma Hiwot Berhan Church'),
('Community Outreach Day', 'Our annual community outreach program where we serve the local community through free medical checkups, food distribution to 500+ families, children''s educational activities, spiritual counseling, and community development workshops.', '2026-05-17', 'Jimma Town Hall & Surrounding Areas'),
('Women''s Fellowship Retreat', 'A weekend retreat for women focusing on spiritual renewal, prayer, worship, and building sisterhood. Theme: "Daughters of the Most High." Features guest speakers, worship sessions, creative workshops, and personal reflection time at Jimma Paradise Lodge.', '2026-06-06', 'Jimma Paradise Lodge'),
('Annual Church Anniversary', 'Celebrating 35 years of God''s faithfulness with a special anniversary service featuring guest ministers from Addis Ababa, choir performances, a thanksgiving feast for all members, and a vision-casting message for the next decade of ministry.', '2026-07-20', 'Main Sanctuary, Jimma Hiwot Berhan Church');

INSERT INTO ministries (name, description, leader, meeting_day, icon) VALUES
('Youth Ministry', 'Empowering young people aged 15-35 to grow in faith, develop their God-given gifts, and serve passionately. Activities include weekly Bible study, monthly worship nights, one-on-one mentorship programs, annual youth conferences, community service projects, and leadership development workshops designed to equip the next generation of church leaders.', 'Brother Daniel Hailu', 'Every Saturday at 3:00 PM', 'users'),
('Women''s Ministry', 'A fellowship of women dedicated to prayer, Bible study, and mutual support. The ministry organizes quarterly retreats for spiritual renewal, monthly fellowship gatherings, annual conferences, community outreach programs, skills training workshops, and a prayer chain that covers the needs of every member around the clock.', 'Sister Ruth Tesfaye', 'Every Thursday at 4:00 PM', 'heart'),
('Music & Worship Ministry', 'Leading the congregation into the presence of God through music, song, and creative arts. The ministry includes the main choir (40+ members), contemporary worship band, traditional Ethiopian worship ensemble, technical team responsible for sound engineering and media production, and a worship training academy for new members.', 'Brother Yohannes Assefa', 'Every Wednesday at 5:00 PM', 'music'),
('Children''s Ministry', 'Nurturing the faith of children from ages 3-14 through age-appropriate Sunday school classes using the "Children Desiring God" curriculum, interactive Bible storytelling, creative arts and crafts, holiday programs, vacation Bible school during summer, and a dedicated children''s worship service that runs concurrently with the main Sunday service.', 'Sister Martha Girma', 'Every Sunday at 10:30 AM', 'book-open');

INSERT INTO testimonials (name, role, content) VALUES
('Alemayehu Bekele', 'Church Member since 2018', 'This church has been my spiritual home for over 8 years. The teachings are deeply rooted in God''s Word, and the community here is truly like family. I have grown immensely in my faith through the weekly Bible study groups, the mentorship of our pastors, and the genuine love and care of fellow members. Hiwot Berhan is where I found my purpose and my spiritual family.'),
('Tigist Worku', 'Youth Ministry Volunteer', 'Being part of the Youth Ministry has completely transformed my life. Before joining, I was struggling with my faith and direction. Through the mentorship program, worship nights, and the incredible friendships I''ve built here, I found my purpose, developed leadership skills I never knew I had, and grew closer to God than ever before. This church truly invests in young people.'),
('Dereje Alemu', 'Deacon', 'The warmth and genuine love of this congregation is unlike anything I''ve experienced in 20 years of being a Christian. From the very first time I walked through the doors as a visitor, I felt truly welcomed and at home. The Wednesday prayer meetings have been a tremendous source of strength during some of the most difficult seasons of my life. God is at work here.'),
('Hanna Fikadu', 'Women''s Ministry Leader', 'Our Women''s Fellowship has been a place of profound healing, growth, and empowerment for me. Through prayer, in-depth Bible study, and the deep fellowship we share, we support one another through life''s challenges and encourage each woman to discover and fulfill her God-given potential. I am grateful for the spiritual sisters God has given me here.');

INSERT INTO weekly_services (name, day, time, description, sort_order) VALUES
('Sunday Morning Worship', 'Sunday', '8:00 AM', 'Our main worship service featuring traditional Ethiopian Orthodox liturgy with hymns, responsive readings, a 45-minute sermon, and Holy Communion. Service conducted in Amharic with simultaneous translation available.', 1),
('Sunday Contemporary Service', 'Sunday', '10:30 AM', 'A contemporary English-language worship service with modern worship music led by our worship band, biblical teaching series, children''s church, and fellowship coffee hour afterward.', 2),
('Wednesday Prayer Meeting', 'Wednesday', '6:00 PM', 'Midweek prayer gathering for intercession, thanksgiving, and corporate prayer. Includes worship songs, guided prayer topics, personal prayer time, and testimonies of answered prayers.', 3),
('Friday Bible Study', 'Friday', '5:00 PM', 'In-depth Bible study exploring Scripture chapter by chapter with group discussion, application questions, and prayer. Currently studying the Gospel of John.', 4),
('Saturday Youth Service', 'Saturday', '3:00 PM', 'Dynamic youth service with contemporary worship, relevant teaching for young people, small group discussions, games, and fellowship. Ages 15-35 welcome.', 5);
