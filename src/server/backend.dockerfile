# Stage 1: Build with Maven
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory in the image
WORKDIR /app

# Copy the pom.xml file and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Setup the runtime environment
FROM amazoncorretto:17

# Create a volume point
VOLUME /tmp

# Expose port 8080 for the application
EXPOSE 4000

# Copy the JAR file from the build stage
COPY --from=builder /app/target/cinema-0.0.1-SNAPSHOT.jar app.jar

# Define the entry point for the application
ENTRYPOINT ["java","-jar","/app.jar"]
