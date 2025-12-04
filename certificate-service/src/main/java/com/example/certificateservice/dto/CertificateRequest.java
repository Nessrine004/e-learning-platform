package com.example.certificateservice.dto;


import lombok.Data;

@Data
public class CertificateRequest {
    private Long studentId;
    private Long courseId;
    private String studentName;
    private String courseTitle;
}