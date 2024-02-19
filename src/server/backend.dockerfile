# Use amazoncorretto 17 as the base image
FROM amazoncorretto:17

# Create a volume point
VOLUME /tmp

# Expose port 8080 for the application
EXPOSE 8080

# Specify the path to the JAR file as a build argument
ARG JAR_FILE=target/cinema-0.0.1-SNAPSHOT.jar

# Add the JAR file from the build context to the image
ADD ${JAR_FILE} app.jar

# Define the entry point for the application
ENTRYPOINT ["java","-jar","/app.jar"]
