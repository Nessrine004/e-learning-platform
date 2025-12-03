package org.example.courseservice.controllers;

import lombok.RequiredArgsConstructor;
import org.example.courseservice.entities.Course;
import org.example.courseservice.repositories.CourseRepository;
import org.example.courseservice.service.YoutubeVideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository repo;
    private final YoutubeVideoService youtubeVideoService;

    @GetMapping
    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return repo.save(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/youtube/search")
    public Map<String, Object> searchYoutubeVideos(
            @RequestParam("q") String query,
            @RequestParam(name = "maxResults", defaultValue = "5") int maxResults
    ) {
        return youtubeVideoService.searchVideos(query, maxResults);
    }
}
