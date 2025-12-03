Projet realise par : Yasmine Bourijal et Nessrine Bekri

<h1 align="center"> Plateforme E-Learning – Microservices Spring Boot</h1>

Ce projet est une architecture microservices permettant de gérer :
- les cours
- les enseignants
- les étudiants
- les inscriptions
- le routing via une API Gateway
- la découverte via Eureka Server

Chaque service expose une **API REST propre** en JSON.

---

##  1. Architecture des microservices

                     ┌────────────────────────┐
                     │   discovery-service    │
                     │      (Eureka 8761)     │
                     └─────────────▲──────────┘
                                   │
                      Service Discovery / Registry
                                   │
                     ┌─────────────┴──────────┐
                     │     gateway-service     │
                     │        (8888)           │
                     └─────────────┬──────────┘
                                   │ Routing
┌───────────────────────────────┼────────────────────────────────────────┐
│                               │                                        │
┌──▼─────────────────┐    ┌────────▼────────┐                ┌─────────────▼──────────┐
│ course-service     │    │ teacher-service │                │ student-service        │
│   (8081)           │    │   (8082)        │                │    (8084)              │
│ /api/courses       │    │ /api/teachers   │                │ /api/students          │
└─────────┬──────────┘    └────────┬─────────┘                └────────────┬───────────┘
│                         │                                        │
│                         │                                        │
└─────────────────────────▼────────────────────────────────────────┘
Calls via Feign
(course + student microservices)

                               ┌───────────────┐
                               │ enrollment-   │
                               │   service     │
                               │    (8083)     │
                               │ /api/enrol... │
                               └───────────────┘

---

##  2. Technologies utilisées

- **Spring Boot 3.3.4**
- **Spring Cloud 2023.0.3**
- **Spring Data JPA**
- **OpenFeign**
- **H2 Database**
- **Eureka Discovery**
- **API Gateway**
- **Java 17**
- **Maven**

---

##  3. Démarrage des microservices (ordre obligatoire)

1**Lancer discovery-service** (Eureka)  
--> http://localhost:8761

**Lancer course-service**
--> http://localhost:8081/api/courses

**Lancer teacher-service**
--> http://localhost:8082/api/teachers

**Lancer enrollment-service**   
--> http://localhost:8083/api/enrollments

**Lancer student-service**
--> http://localhost:8084/api/students

**Lancer gateway-service**  
--> http://localhost:8888/

---

![Architecture](pics/e-1.png)

![Architecture](pics/e-2.png)

![Architecture](pics/e-3.png)

![Architecture](pics/e-4.png)

![Architecture](pics/e-5.png)

![Architecture](pics/e-6.png)

![Architecture](pics/e-7.png)

![Architecture](pics/e-8.png)

![Architecture](pics/e-9.jpeg)

On a intégré un WebClient dans le microservice course-service afin de permettre la récupération dynamique de contenus externes. Le service interroge l’API YouTube Data API v3 pour rechercher des vidéos pédagogiques liées aux cours (ex : Java, DevOps, Microservices…). Un endpoint REST /api/courses/youtube/search a été ajouté pour exposer ces résultats.

Tester la recherche YouTube (WebClient)--> http://localhost:8081/api/courses/youtube/search?q=java&maxResults=1
![Architecture](pics/img.png)
![Architecture](pics/img_1.png)







 


