FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /workspace/app

COPY Backend-Refatorado/mvnw .
COPY Backend-Refatorado/mvnw.cmd .
COPY Backend-Refatorado/.mvn .mvn
COPY Backend-Refatorado/pom.xml .
COPY Backend-Refatorado/src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /workspace/app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
