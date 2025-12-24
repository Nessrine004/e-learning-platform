package org.example.courseservice;

import org.example.courseservice.entities.Course;
import org.example.courseservice.repositories.CourseRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import lombok.extern.slf4j.Slf4j;


@SpringBootApplication
@Slf4j
public class CourseServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CourseServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner init(CourseRepository repo) {
        return args -> {

            log.info(" Initialisation des cours professionnels...");

            repo.save(Course.builder()
                    .title("Administration Oracle")
                    .description("Gestion, optimisation et sécurisation d’une base de données Oracle.")
                    .teacherId(1L)
                    .category("Base de données")
                    .duration(40)
                    .build());

            repo.save(Course.builder()
                    .title(".NET Core Development")
                    .description("Développement d’applications web et API REST avec ASP.NET Core.")
                    .teacherId(2L)
                    .category("Développement")
                    .duration(35)
                    .build());

            repo.save(Course.builder()
                    .title("DevOps & CI/CD")
                    .description("Pipeline CI/CD, Docker, Kubernetes, Jenkins, GitLab, monitoring.")
                    .teacherId(3L)
                    .category("DevOps")
                    .duration(45)
                    .build());

            repo.save(Course.builder()
                    .title("Linux System Administration")
                    .description("Commandes Linux, gestion des services, permissions, réseau.")
                    .teacherId(4L)
                    .category("Systèmes")
                    .duration(30)
                    .build());

            log.info(" Données insérées dans la base course-db!");
        };
    }

}
