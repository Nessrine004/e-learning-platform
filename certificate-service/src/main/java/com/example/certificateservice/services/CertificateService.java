package com.example.certificateservice.services;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import com.example.certificateservice.dto.CertificateRequest;
import com.example.certificateservice.entities.Certificate;
import com.example.certificateservice.repositories.CertificateRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository certificateRepository;

    public Certificate generateCertificate(CertificateRequest request) {
        // 1) générer le PDF en mémoire
        byte[] pdfBytes = buildPdf(
                request.getStudentName(),
                request.getCourseTitle()
        );

        // 2) persister le certificat en BDD
        Certificate cert = Certificate.builder()
                .studentId(request.getStudentId())
                .courseId(request.getCourseId())
                .studentName(request.getStudentName())
                .courseTitle(request.getCourseTitle())
                .issuedAt(LocalDateTime.now())
                .pdfData(pdfBytes)
                .build();

        return certificateRepository.save(cert);
    }

    public byte[] getCertificatePdf(Long id) {
        Certificate cert = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificat introuvable"));
        return cert.getPdfData();
    }

    private byte[] buildPdf(String studentName, String courseTitle) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document doc = new Document();
            PdfWriter.getInstance(doc, baos);
            doc.open();

            doc.add(new Paragraph("CERTIFICAT DE RÉUSSITE"));
            doc.add(new Paragraph(" "));
            doc.add(new Paragraph("Ce certificat est décerné à :"));
            doc.add(new Paragraph("Étudiant : " + studentName));
            doc.add(new Paragraph("Cours : " + courseTitle));
            doc.add(new Paragraph(" "));
            doc.add(new Paragraph("Félicitations pour votre réussite !"));

            doc.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erreur génération PDF", e);
        }
    }
}