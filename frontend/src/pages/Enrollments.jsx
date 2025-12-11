import { useEffect, useState } from 'react';
import axios from 'axios';

function Enrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [studentsById, setStudentsById] = useState({});
    const [coursesById, setCoursesById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadAll() {
            try {
                const [enRes, stRes, coRes] = await Promise.all([
                    axios.get('/api/enrollments'),
                    axios.get('/api/students'),
                    axios.get('/api/courses'),
                ]);

                // ---- Enrollments ----
                let en = [];
                if (enRes.data._embedded && enRes.data._embedded.enrollments) {
                    en = enRes.data._embedded.enrollments;
                } else if (Array.isArray(enRes.data)) {
                    en = enRes.data;
                }
                setEnrollments(en);

                // ---- Students ----
                let st = [];
                if (stRes.data._embedded && stRes.data._embedded.students) {
                    st = stRes.data._embedded.students;
                } else if (Array.isArray(stRes.data)) {
                    st = stRes.data;
                }
                const stMap = {};
                st.forEach((s) => {
                    stMap[s.id] = s.fullname ?? s.name ?? `Etudiant #${s.id}`;
                });
                setStudentsById(stMap);

                // ---- Courses ----
                let cs = [];
                if (coRes.data._embedded && coRes.data._embedded.courses) {
                    cs = coRes.data._embedded.courses;
                } else if (Array.isArray(coRes.data)) {
                    cs = coRes.data;
                }
                const csMap = {};
                cs.forEach((c) => {
                    csMap[c.id] = c.title ?? `Cours #${c.id}`;
                });
                setCoursesById(csMap);
            } catch (err) {
                console.error('Erreur chargement inscriptions :', err);
                setError("Erreur lors du chargement des inscriptions.");
            } finally {
                setLoading(false);
            }
        }

        loadAll();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <section>
            <h2 className="page-title">Inscriptions ({enrollments.length})</h2>
            <p className="page-subtitle">
                Données servies par le microservice <strong>enrollment-service</strong>.
            </p>

            {enrollments.length === 0 ? (
                <p>Aucune inscription trouvée.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Étudiant</th>
                            <th>Cours</th>
                            <th>Date</th>
                            <th>Statut</th>
                        </tr>
                        </thead>
                        <tbody>
                        {enrollments.map((e, index) => (
                            <tr key={e.id ?? index}>
                                <td>{e.id}</td>
                                <td>{studentsById[e.studentId] ?? e.studentId}</td>
                                <td>{coursesById[e.courseId] ?? e.courseId}</td>
                                <td>{e.date ?? '-'}</td>

                                <td>
                                    {e.status ? (
                                        <span className="card-tag">{e.status}</span>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default Enrollments;
