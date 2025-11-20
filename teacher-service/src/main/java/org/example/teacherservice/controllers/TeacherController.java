package org.example.teacherservice.controllers;

import lombok.RequiredArgsConstructor;
import org.example.teacherservice.entities.Teacher;
import org.example.teacherservice.repositories.TeacherRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teachers")
public class TeacherController {

    private final TeacherRepository repo;

    // GET all teachers
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return repo.findAll();
    }

    // GET teacher by ID
    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // POST (add teacher)
    @PostMapping
    public Teacher addTeacher(@RequestBody Teacher teacher) {
        return repo.save(teacher);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
