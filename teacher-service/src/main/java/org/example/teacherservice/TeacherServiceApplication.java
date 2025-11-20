package org.example.teacherservice;

import org.example.teacherservice.entities.Teacher;
import org.example.teacherservice.repositories.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TeacherServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeacherServiceApplication.class, args);
    }


    @Bean
    CommandLineRunner initTeachers(TeacherRepository repo) {
        return args -> {
            System.out.println(" Insertion des enseignants...");

            repo.save(Teacher.builder()
                    .name("Yasmine Bourijal")
                    .email("yasmine.bourijal@emsi-edu.ma")
                    .speciality("DevOps & Cloud Computing")
                    .build());

            repo.save(Teacher.builder()
                    .name("Rania Jarrah")
                    .email("rania.jarrah@emsi-edu.ma")
                    .speciality("Administration Oracle & Base de données")
                    .build());

            repo.save(Teacher.builder()
                    .name("Yassine Naki")
                    .email("yassine.naki@emsi-edu.ma")
                    .speciality(".NET Core & Architecture Logicielle")
                    .build());

            System.out.println(" Enseignants insérés !");
        };
    }

}


