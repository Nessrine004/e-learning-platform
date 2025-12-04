package com.example.certificateservice.repositories;

import com.example.certificateservice.entities.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}