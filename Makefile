setup: clean
	mvn -f server clean package
	docker compose up --build
stop:
	docker compose stop
start:
	docker compose start
re:
	docker compose restart
clean:
	docker compose down
	docker rmi server || echo cinema-server already removed!
	docker rmi frontend || echo cinema-frontend already removed!
	docker rmi mysql:8.3.0 || echo mysql:8.3.0 already removed!
test:
	mvn -f server test
local:
	mvn -f server clean package
	java -jar -Dspring.profiles.active=local server/target/cinema-0.0.1-SNAPSHOT.jar