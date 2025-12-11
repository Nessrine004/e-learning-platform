// src/pages/Courses.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('/api/courses')
            .then((res) => {
                let list = [];

                if (res.data._embedded && Array.isArray(res.data._embedded.courses)) {
                    list = res.data._embedded.courses;
                } else if (Array.isArray(res.data)) {
                    list = res.data;
                }

                setCourses(list);
            })
            .catch((err) => {
                console.error('Erreur Axios /courses :', err);
                setError("Erreur lors du chargement des cours.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <section>
            <h2 className="page-title">Liste des cours ({courses.length})</h2>
            <p className="page-subtitle">
                Cours exposés par le microservice <strong>course-service</strong>.
            </p>

            {courses.length === 0 ? (
                <p>Aucun cours trouvé.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Durée</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id ?? index}>
                                <td>{course.id}</td>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td>{course.duration}</td>
                                <td>{course.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default Courses;
