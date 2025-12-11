// src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section className="home">
            {/* Bandeau en haut */}
            <div className="home-hero">
                <div className="home-hero-grid">
                    {/* Colonne gauche : texte */}
                    <div className="home-hero-left">
                        <span className="home-pill">Plateforme E-Learning · Projet EMSI 2025</span>

                        <h1 className="home-title">
                            Welcome to the <span className="home-title-highlight">E-Learning</span>{' '}
                            platform.
                        </h1>

                        <p className="home-subtitle">
                            Une plateforme pédagogique construite sur une architecture
                            <strong> microservices Spring Boot</strong>, exposant des API REST
                            pour gérer les cours, les enseignants, les étudiants, les inscriptions
                            et les certificats.
                        </p>

                        <div className="home-buttons">
                            <Link to="/courses" className="btn-primary">
                                Voir les cours
                            </Link>
                            <Link to="/teachers" className="btn-secondary">
                                Rencontrer les enseignants
                            </Link>
                        </div>

                        <p className="home-note">
                            Utilise la barre de navigation pour explorer les données exposées par
                            les différents microservices.
                        </p>
                    </div>

                    {/* Colonne droite : “visuel” stylisé */}
                    <div className="home-hero-right">
                        <div className="home-hero-circle">
                            <div className="home-hero-circle-inner">
                                <span className="home-hero-circle-title">Microservices</span>
                                <ul className="home-hero-services">
                                    <li>course-service</li>
                                    <li>teacher-service</li>
                                    <li>student-service</li>
                                    <li>enrollment-service</li>
                                    <li>certificate-service</li>
                                    <li>api-gateway · discovery</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section stats */}
            <div className="home-stats">
                <div className="home-stat-card">
                    <span className="home-stat-label">Cours</span>
                    <span className="home-stat-value">4+</span>
                    <span className="home-stat-caption">Exposés via course-service</span>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-label">Enseignants</span>
                    <span className="home-stat-value">3</span>
                    <span className="home-stat-caption">
            Données servies par teacher-service
          </span>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-label">Étudiants</span>
                    <span className="home-stat-value">3</span>
                    <span className="home-stat-caption">
            Gestion des profils étudiants
          </span>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-label">Certificats</span>
                    <span className="home-stat-value">PDF</span>
                    <span className="home-stat-caption">
            Génération via certificate-service
          </span>
                </div>
            </div>
        </section>
    );
}

export default Home;
