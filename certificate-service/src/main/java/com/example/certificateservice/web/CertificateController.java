package com.example.certificateservice.web;

import lombok.RequiredArgsConstructor;
import com.example.certificateservice.dto.CertificateRequest;
import com.example.certificateservice.entities.Certificate;
import com.example.certificateservice.services.CertificateService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    @PostMapping
    public Certificate createCertificate(@RequestBody CertificateRequest request) {
        return certificateService.generateCertificate(request);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long id) {
        byte[] pdf = certificateService.getCertificatePdf(id);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=certificate-" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
