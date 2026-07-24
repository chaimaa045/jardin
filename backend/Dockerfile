# Étape 1 : Build de l'application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Télécharger les dépendances pour utiliser le cache Docker
RUN mvn dependency:go-offline -B
COPY src ./src
# Compiler le projet
RUN mvn clean package -DskipTests

# Étape 2 : Image finale légère pour l'exécution
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Le port exposé par défaut par Spring Boot
EXPOSE 8080
# Commande de démarrage
ENTRYPOINT ["java", "-jar", "app.jar"]
