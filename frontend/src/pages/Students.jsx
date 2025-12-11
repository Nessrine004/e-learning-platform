// src/pages/Students.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('/api/students')
            .then((res) => {
                let list = [];

                if (res.data._embedded && Array.isArray(res.data._embedded.students)) {
                    list = res.data._embedded.students;
                } else if (Array.isArray(res.data)) {
                    list = res.data;
                }

                setStudents(list);
            })
            .catch((err) => {
                console.error('Erreur Axios /students :', err);
                setError("Erreur lors du chargement des étudiants.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <section>
            <h2 className="page-title">Étudiants ({students.length})</h2>
            <p className="page-subtitle">
                Données servies par le microservice <strong>student-service</strong>.
            </p>

            {students.length === 0 ? (
                <p>Aucun étudiant trouvé.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom complet</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((s, index) => (
                            <tr key={s.id ?? index}>
                                <td>{s.id}</td>
                                <td>{s.fullname}</td>
                                <td>{s.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default Students;
