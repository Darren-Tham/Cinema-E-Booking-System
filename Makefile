setup:
	docker compose -f "docker-compose.yml" up -d --build
	pip3 install mysql-connector-python
	pip3 install pandas
<<<<<<< HEAD
	sleep 10
=======
	sleep 2.5
>>>>>>> ac080af (fix setup makefile, removed id because it will auto generate)
	python3 src/data/initializer.py	
stop:
	docker compose stop
start:
	docker compose start
data:
	python3 src/data/initializer.py
<<<<<<< HEAD
=======
re:
	docker compose restart
start:
	docker compose start

>>>>>>> ac080af (fix setup makefile, removed id because it will auto generate)
re:
	docker compose restart
clean:
	docker stop $$(docker ps -a -q)
	docker system prune -a --volumes