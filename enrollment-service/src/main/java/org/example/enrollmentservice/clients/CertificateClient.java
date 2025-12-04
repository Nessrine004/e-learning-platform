package org.example.enrollmentservice.clients;
import org.example.enrollmentservice.dto.CertificateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "CERTIFICATE-SERVICE")
public interface CertificateClient {

    @PostMapping("/api/certificates")
    CertificateResponse createCertificate(CertificateRequest request);

    // petite projection de la réponse (tu peux l’adapter)
    record CertificateResponse(
            Long id,
            Long studentId,
            Long courseId,
            String studentName,
            String courseTitle
    ) {}
}