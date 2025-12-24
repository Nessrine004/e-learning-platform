package org.example.courseservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.courseservice.entities.Course;
import org.example.courseservice.repositories.CourseRepository;
import org.example.courseservice.service.YoutubeVideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@WebMvcTest(CourseController.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CourseRepository repo;

    @MockBean
    private YoutubeVideoService youtubeVideoService;

    @Test
    void getAllCourses_shouldReturn200() throws Exception {
        when(repo.findAll()).thenReturn(List.of(
                Course.builder().id(1L).title("Oracle").build(),
                Course.builder().id(2L).title("DevOps").build()
        ));

        mockMvc.perform(get("/api/courses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Oracle"));
    }

    @Test
    void getCourse_shouldReturnCourse_whenExists() throws Exception {
        when(repo.findById(1L)).thenReturn(Optional.of(
                Course.builder().id(1L).title("Oracle").build()
        ));

        mockMvc.perform(get("/api/courses/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Oracle"));
    }

    @Test
    void addCourse_shouldReturnSavedCourse() throws Exception {
        Course input = Course.builder().title("Linux").description("Basics").teacherId(4L).category("Sys").duration(30).build();
        Course saved = Course.builder().id(10L).title("Linux").description("Basics").teacherId(4L).category("Sys").duration(30).build();

        when(repo.save(any(Course.class))).thenReturn(saved);

        mockMvc.perform(post("/api/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.title").value("Linux"));
    }

    @Test
    void deleteCourse_shouldReturn200() throws Exception {
        doNothing().when(repo).deleteById(5L);

        mockMvc.perform(delete("/api/courses/5"))
                .andExpect(status().isOk());

        verify(repo, times(1)).deleteById(5L);
    }

    @Test
    void searchYoutubeVideos_shouldReturn200() throws Exception {
        when(youtubeVideoService.searchVideos("java", 5)).thenReturn(Map.of("items", List.of()));

        mockMvc.perform(get("/api/courses/youtube/search")
                        .param("q", "java")
                        .param("maxResults", "5"))
                .andExpect(status().isOk());
    }
}
