package org.example.studentservice;

import org.example.studentservice.entities.Student;
import org.example.studentservice.repositories.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StudentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentServiceApplication.class, args);
        System.out.println("student-service démarré avec succès !");
    }

    @Bean
    CommandLineRunner init(StudentRepository repo) {
        return args -> {
            System.out.println(" Insertion des étudiants...");

            repo.save(Student.builder()
                    .fullname("Sara El Fassi")
                    .email("sara.elfassi@emsi-edu.ma")
                    .build());

            repo.save(Student.builder()
                    .fullname("Mohamed Ait Lahcen")
                    .email("mohamed.aitlahcen@emsi-edu.ma")
                    .build());

            repo.save(Student.builder()
                    .fullname("Nour El Houda Karimi")
                    .email("nour.karimi@emsi-edu.ma")
                    .build());

            System.out.println(" Étudiants insérés avec succès !");
        };
    }
}
