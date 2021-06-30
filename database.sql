--Create artist table
CREATE TABLE "artist" (
  "id" serial primary key,
  "name" varchar(80) NOT NULL,
  "birthdate" date
 );


INSERT INTO artist ( "name", "birthdate")
VALUES ('Ella Fitzgerald', '04-25-1927'),
('Dave Brubeck', '12-06-1920'),
('Miles Davis', '05-26-1926'),
('Esperanza Spalding', '10-18-1984'); 


-- create song table 
CREATE TABLE "song" (
  "id" serial primary key,
  "title" varchar(225) not null,
  "length" varchar(10) not null,
  "released" varchar(120) not null
);

INSERT INTO song ("title", "length","released")
VALUES ('Take Five', '5:24','1959-09-29'),
('So What', '9:22', '1959-08-17'),
('Black Gold', '5:17', '2012-02-01');

