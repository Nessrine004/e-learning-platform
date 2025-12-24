package org.example.enrollmentservice.services;

import lombok.RequiredArgsConstructor;
import org.example.enrollmentservice.clients.CertificateClient;
import org.example.enrollmentservice.clients.CourseClient;
import org.example.enrollmentservice.clients.StudentClient;
import org.example.enrollmentservice.dto.CertificateRequest;
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
    private final CertificateClient certificateClient; // 👈 nouveau
    private final EnrollmentRepository repo;

    public Enrollment enroll(Long courseId, Long studentId) {

        // Vérifier que le cours existe + récupérer ses infos
        var course = courseClient.findCourseById(courseId);

        // Vérifier que l’étudiant existe + récupérer ses infos
        var student = studentClient.findStudentById(studentId);

        // Créer l'inscription
        Enrollment e = Enrollment.builder()
                .courseId(courseId)
                .studentId(studentId)
                .status("ENROLLED")
                .date(LocalDate.now().toString())
                .build();

        Enrollment saved = repo.save(e);

        // Appeler certificate-service pour générer un certificat
        CertificateRequest certReq = CertificateRequest.builder()
                .studentId(studentId)
                .courseId(courseId)
                .studentName(/* adapte : */ student.getFullname())   // ou student.getFirstName()+" "+student.getLastName()
                .courseTitle(course.getTitle())
                .build();

        certificateClient.createCertificate(certReq);

        return saved;
    }

    public List<Enrollment> getAllEnrollments() {
        return repo.findAll();
    }
}
