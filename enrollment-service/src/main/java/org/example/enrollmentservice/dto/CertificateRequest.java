package org.example.enrollmentservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CertificateRequest {
    private Long studentId;
    private Long courseId;
    private String studentName;
    private String courseTitle;
}