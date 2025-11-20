package org.example.studentservice.controllers;

import lombok.RequiredArgsConstructor;
import org.example.studentservice.entities.Student;
import org.example.studentservice.repositories.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository repo;

    @GetMapping
    public List<Student> getStudents() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
