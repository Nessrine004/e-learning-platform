package org.example.courseservice.repositories;

import org.example.courseservice.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CourseRepository extends JpaRepository<Course, Long> {
}
