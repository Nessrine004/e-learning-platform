package org.example.enrollmentservice.services;

import lombok.RequiredArgsConstructor;
import org.example.enrollmentservice.clients.CourseClient;
import org.example.enrollmentservice.clients.StudentClient;
import org.example.enrollmentservice.entities.Enrollment;
import org.example.enrollmentservice.repositories.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentManager {

    private final CourseClient courseClient;
    private final StudentClient studentClient;
    private final EnrollmentRepository repo;

    public Enrollment enroll(Long courseId, Long studentId) {

        // Vérifier que le cours existe
        courseClient.findCourseById(courseId);

        // Vérifier que l’étudiant existe
        studentClient.findStudentById(studentId);

        // Créer l'inscription
        Enrollment e = Enrollment.builder()
                .courseId(courseId)
                .studentId(studentId)
                .status("ENROLLED")
                .date(LocalDate.now().toString())
                .build();

        return repo.save(e);
    }

    // Méthode correctement placée EN DEHORS de la méthode enroll()
    public List<Enrollment> getAllEnrollments() {
        return repo.findAll();
    }
}
