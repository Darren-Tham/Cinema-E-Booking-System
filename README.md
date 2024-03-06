# How To Run The Application With Makefile

## make

`Build the Application by setting up the database, server and backend. Database is also initialized.`

## make stop

`Stop All Containers: To stop all containers defined in your docker-compose.yml file without removing them`

## make start

`Start All Containers Again: When you want to start developing again and need to bring up all the containers without rebuilding them`

## make re

`Restart All Containers: If you need to restart all containers (for example, after making changes to your configuration files that don't require rebuilding the images).`

## make clean

`Stops and removes all containers, including images.`

# Database (only works when you have the containers running)

1. Start instance of MySQL in your terminal

   `docker exec -it db bash`

2. Connect to Database

   `mysql`

## Exposed Ports

Frontend: `3000`

Backend: `8080`

Database: `3306`

# Test Case

INSERT INTO movies(movie_name, trailer_link, image_link, movie_category) VALUES ('Parasite', 'https://www.youtube.com/watch?v=SEUXfv87Wpk', 'https://m.media-amazon.com/images/I/91KArYP03YL._AC_UF894,1000_QL80*.jpg', 'Now Playing');

INSERT INTO movies(movie_name, trailer_link, image_link, movie_category) VALUES ('Parasite', 'https://www.youtube.com/watch?v=SEUXfv87Wpk', 'https://m.media-amazon.com/images/I/91KArYP03YL._AC_UF894,1000_QL80*.jpg', 'Coming Soon');
