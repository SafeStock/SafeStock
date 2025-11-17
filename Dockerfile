FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /workspace/app

COPY Back-end/mvnw .
COPY Back-end/mvnw.cmd .
COPY Back-end/.mvn .mvn
COPY Back-end/pom.xml .
COPY Back-end/src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /workspace/app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
