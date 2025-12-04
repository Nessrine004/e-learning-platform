package com.example.certificateservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long courseId;

    private String studentName;
    private String courseTitle;

    private LocalDateTime issuedAt;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] pdfData;   // on stocke le PDF directement en BDD
}
