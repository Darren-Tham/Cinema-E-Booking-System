setup:
	docker compose -f "docker-compose.yml" up -d --build
	pip3 install mysql-connector-python
	pip3 install pandas

stop:
	docker stop $(docker ps -a -q)

clean: stop
	docker system prune -a -f --volumes