package org.example.enrollmentservice;

import org.example.enrollmentservice.entities.Enrollment;
import org.example.enrollmentservice.repositories.EnrollmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class EnrollmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnrollmentServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(EnrollmentRepository repo) {
        return args -> {

            System.out.println("➡️ Insertion des inscriptions dans enrollment-service...");

            repo.save(Enrollment.builder()
                    .courseId(1L)
                    .studentId(1L)
                    .status("ENROLLED")
                    .date("2025-01-20")
                    .build());

            repo.save(Enrollment.builder()
                    .courseId(2L)
                    .studentId(2L)
                    .status("ENROLLED")
                    .date("2025-01-21")
                    .build());

            repo.save(Enrollment.builder()
                    .courseId(3L)
                    .studentId(3L)
                    .status("ENROLLED")
                    .date("2025-01-22")
                    .build());

            System.out.println("✔️ Données d’inscriptions ajoutées !");
        };
    }
}
