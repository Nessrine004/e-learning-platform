// src/pages/Teachers.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('/api/teachers')
            .then((res) => {
                let list = [];

                if (res.data._embedded && Array.isArray(res.data._embedded.teachers)) {
                    list = res.data._embedded.teachers;
                } else if (Array.isArray(res.data)) {
                    list = res.data;
                }

                setTeachers(list);
            })
            .catch((err) => {
                console.error('Erreur Axios /teachers :', err);
                setError("Erreur lors du chargement des enseignants.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <section>
            <h2 className="page-title">Enseignants ({teachers.length})</h2>
            <p className="page-subtitle">
                Données servies par le microservice <strong>teacher-service</strong>.
            </p>

            {teachers.length === 0 ? (
                <p>Aucun enseignant trouvé.</p>
            ) : (
                <div className="cards-grid">
                    {teachers.map((t, index) => (
                        <article className="card" key={t.id ?? index}>
                            <h3 className="card-title">{t.name}</h3>
                            {t.speciality && (
                                <span className="card-tag">{t.speciality}</span>
                            )}

                            <p className="card-line">
                                <span className="card-label">ID :</span> {t.id}
                            </p>

                            {t.email && (
                                <p className="card-email">
                                    <span className="card-label">Email :</span> {t.email}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Teachers;
