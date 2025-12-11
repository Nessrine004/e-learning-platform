// src/pages/Certificates.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Certificates() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [studentsRes, coursesRes] = await Promise.all([
                    axios.get('/api/students'),
                    axios.get('/api/courses'),
                ]);

                let st = [];
                if (
                    studentsRes.data._embedded &&
                    Array.isArray(studentsRes.data._embedded.students)
                ) {
                    st = studentsRes.data._embedded.students;
                } else if (Array.isArray(studentsRes.data)) {
                    st = studentsRes.data;
                }

                let cs = [];
                if (
                    coursesRes.data._embedded &&
                    Array.isArray(coursesRes.data._embedded.courses)
                ) {
                    cs = coursesRes.data._embedded.courses;
                } else if (Array.isArray(coursesRes.data)) {
                    cs = coursesRes.data;
                }

                setStudents(st);
                setCourses(cs);
            } catch (err) {
                console.error('Erreur chargement données certificat :', err);
                setError("Erreur lors du chargement des étudiants / cours.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!studentId || !courseId) {
            setError('Veuillez choisir un étudiant et un cours.');
            return;
        }

        const student = students.find((s) => String(s.id) === String(studentId));
        const course = courses.find((c) => String(c.id) === String(courseId));

        if (!student || !course) {
            setError('Données invalides.');
            return;
        }

        const payload = {
            studentId: student.id,
            courseId: course.id,
            studentName: student.fullname ?? student.name,
            courseTitle: course.title,
        };

        try {
            setGenerating(true);
            const res = await axios.post('/api/certificates', payload);

            // Cas où le backend renvoie { id, pdfData, ... }
            const data = res.data;
            setMessage('Certificat généré avec succès.');

            if (data.pdfData) {
                const byteCharacters = atob(data.pdfData);
                const byteNumbers = new Array(byteCharacters.length)
                    .fill(0)
                    .map((_, i) => byteCharacters.charCodeAt(i));
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            } else {
                // Sinon, tu peux utiliser l’endpoint GET /api/certificates/{id}/download
                if (data.id) {
                    window.open(`/api/certificates/${data.id}/download`, '_blank');
                }
            }
        } catch (err) {
            console.error('Erreur génération certificat :', err);
            setError("Erreur lors de la génération du certificat.");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <section>
            <h2 className="page-title">Certificats</h2>
            <p className="page-subtitle">
                Génération de certificats via le microservice{' '}
                <strong>certificate-service</strong>.
            </p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: '#4ade80' }}>{message}</p>}

            <form onSubmit={handleGenerate} style={{ marginTop: '1.5rem', maxWidth: '480px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>
                        Étudiant
                    </label>
                    <select
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '0.5rem' }}
                    >
                        <option value="">-- Sélectionner un étudiant --</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.fullname ?? s.name} (ID {s.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>
                        Cours
                    </label>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '0.5rem' }}
                    >
                        <option value="">-- Sélectionner un cours --</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title} (ID {c.id})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={generating}
                    style={{
                        padding: '0.5rem 1.2rem',
                        borderRadius: '999px',
                        border: 'none',
                        background: '#2563eb',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    {generating ? 'Génération...' : 'Générer le certificat'}
                </button>
            </form>
        </section>
    );
}

export default Certificates;
