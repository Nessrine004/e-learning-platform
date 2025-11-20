package org.example.enrollmentservice.repositories;

import org.example.enrollmentservice.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
}
