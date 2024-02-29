# How To Run The Application With Makefile

## make

<<<<<<< HEAD
<<<<<<< HEAD
`Build the Application: Setup frontend, database, backend & initializes the database`
=======
Build the Application: Setup frontend, database, backend & initializes the database.
>>>>>>> 71aaeae (Update README.md)
=======
`Build the Application: Setup frontend, database, backend & initializes the database`
>>>>>>> ac080af (fix setup makefile, removed id because it will auto generate)

## make stop

`Stop All Containers: To stop all containers defined in your docker-compose.yml file without removing them`

## make start

`Start All Containers Again: When you want to start developing again and need to bring up all the containers without rebuilding them`

## make re

`Restart All Containers: If you need to restart all containers (for example, after making changes to your configuration files that don't require rebuilding the images).`

## make clean

`stops & removes all the containers`

# Database (only works when you have the containers running)

1. Start instance of MySQL in your terminal

   `docker exec -it db bash`

2. Connect to Database

   `mysql -u swe -p`

3. Put in the password

   `password`

## Exposed Ports

Frontend: `3000`

Backend: `8080`

Database: `3306`
