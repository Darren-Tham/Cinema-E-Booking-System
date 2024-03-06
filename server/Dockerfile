FROM openjdk:23
WORKDIR /app
RUN rm -f /app/*.war
COPY ./target/cinema-0.0.1-SNAPSHOT.jar /app
EXPOSE 8080
CMD ["java", "-jar", "-Dspring.profiles.active=docker", "cinema-0.0.1-SNAPSHOT.jar"]