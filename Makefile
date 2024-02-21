setup:
	docker compose -f "docker-compose.yml" up -d --build
	pip3 install mysql-connector-python
	pip3 install pandas

stop:
	docker compose down
rerun:
	docker compose up
clean:
	docker stop $$(docker ps -a -q)
	docker system prune -a --volumes

re: clean
	make setup