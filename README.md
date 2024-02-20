# Running Frontend & Backend & MySQL container with docker-compose

1. Build Front, Database, Backend images

   `docker compose -f "docker-compose.yml" up -d --build`

2. Stop and remove all containers

   `docker stop $(docker ps -a -q)`

3. To delete unused/dangling processes when finished

   `docker system prune -a --volumes`

4. To rerun all stopped containers

`docker start $(docker ps -a -q -f "status=exited")`

# Database

1. Run docker-compose as shown above

   `docker compose -f "docker-compose.yml" up -d --build`

2. Start instance of MySQL

   `docker exec -it db bash`

3. Connect to Database

   `mysql -u swe -p`

4. Put in password

   `password`

# Running the Frontend container

1. Build the image

   `docker build --pull --rm -f "frontend.dockerfile" -t cinemaebookingsystem:latest "."`

2. Create and run container

   `docker run -p 3000:3000 cinemaebookingsystem:latest`

3. Client will be hosted at http://localhost:3000/

# Running the Backend container

1. Build the image

   `docker build --pull --rm -f "backend.dockerfile" -t cinemaebookingsystem:latest "."`

2. Create and run container

   `docker run -p 8080:8080 cinemaebookingsystem:latest`

3. Server will be hosted at http://localhost:3000/

   _Currently since there's no implementation, the container closes instantly after running. Might not work, we will see once there's actual endpoints and implementation added._

## Exposed Ports

Frontend: `3000`

Backend: `8080`

Database: `3306`

## Initialize Dummy Data

1. Install dependencies for Python using the following commands
   ```pip3 install mysql-connector-python```
   ```pip3 install pandas```
2. Make sure your DB Container is running and execute the `initializer.py` file, which is located in `src/data`
