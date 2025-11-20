package org.example.enrollmentservice.controllers;

import lombok.RequiredArgsConstructor;
import org.example.enrollmentservice.entities.Enrollment;
import org.example.enrollmentservice.services.EnrollmentManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentManager manager;

    @PostMapping("/enroll")
    public Enrollment enroll(
            @RequestParam Long courseId,
            @RequestParam Long studentId
    ) {
        return manager.enroll(courseId, studentId);
    }

    @GetMapping
    public List<Enrollment> getAll() {
        return manager.getAllEnrollments();
    }

}
