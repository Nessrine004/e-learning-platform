package org.example.enrollmentservice.clients;

import org.example.enrollmentservice.dto.CourseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "course-service")
public interface CourseClient {

    @GetMapping("/courses/{id}")
    CourseDTO findCourseById(@PathVariable Long id);
}

