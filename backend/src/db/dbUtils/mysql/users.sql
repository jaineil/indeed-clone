-- create table users
CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    userPersona VARCHAR(100) DEFAULT "job_seeker",
    employerName VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    emailId VARCHAR(100),
    pass VARCHAR(100)
);