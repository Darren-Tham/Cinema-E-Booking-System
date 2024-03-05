setup: clean
	mvn -f server clean package
	docker compose up --build
stop:
	docker compose stop
start:
	docker compose start
re:
	docker compose restart
test:
	mvn -f server test
clean:
	docker compose down
	docker rmi cinema-server || echo cinema-server already removed!
	docker rmi cinema-frontend || echo cinema-frontend already removed!
	docker rmi mysql:8.3.0 || echo mysql:8.3.0 already removed!
