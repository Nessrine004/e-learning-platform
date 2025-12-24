// src/pages/Courses.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function extractVideoId(url) {
    try {
        const parsed = new URL(url);

        // https://www.youtube.com/watch?v=XXXX
        const v = parsed.searchParams.get("v");
        if (v) return v;

        // https://youtu.be/XXXX
        if (parsed.hostname === "youtu.be") {
            return parsed.pathname.replace("/", "") || null;
        }

        // https://www.youtube.com/embed/XXXX
        if (parsed.pathname.startsWith("/embed/")) {
            return parsed.pathname.split("/embed/")[1] || null;
        }

        return null;
    } catch {
        return null;
    }
}

// Transforme la réponse Map YouTube -> [{ videoId, title, thumbnail }]
function normalizeYoutubeResponse(data) {
    const items = Array.isArray(data?.items) ? data.items : [];
    return items
        .map((it) => {
            const videoId =
                it?.id?.videoId ||
                (typeof it?.id === "string" ? it.id : null) ||
                null;

            const title = it?.snippet?.title || "Vidéo YouTube";
            const thumbnails = it?.snippet?.thumbnails || {};
            const thumbnail =
                thumbnails?.high?.url ||
                thumbnails?.medium?.url ||
                thumbnails?.default?.url ||
                "";

            return { videoId, title, thumbnail };
        })
        .filter((v) => !!v.videoId);
}

export default function Courses() {
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // YouTube
    const [videos, setVideos] = useState([]); // toujours un tableau
    const [videoLoading, setVideoLoading] = useState(true);
    const [videoError, setVideoError] = useState("");

    // Recherche YouTube
    const [query, setQuery] = useState("java");
    const [maxResults, setMaxResults] = useState(3);

    // Recherche par URL
    const [videoUrl, setVideoUrl] = useState("");
    const [urlError, setUrlError] = useState("");

    // --- Charger cours + vidéos au montage ---
    useEffect(() => {
        // 1) Cours
        axios
            .get("/api/courses")
            .then((res) => {
                let list = [];

                if (res.data?._embedded && Array.isArray(res.data._embedded.courses)) {
                    list = res.data._embedded.courses;
                } else if (Array.isArray(res.data)) {
                    list = res.data;
                }

                setCourses(list);
            })
            .catch(() => setError("Erreur lors du chargement des cours."))
            .finally(() => setLoading(false));

        // 2) YouTube (par défaut)
        fetchYoutubeVideos("java", 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchYoutubeVideos(q, max) {
        setVideoLoading(true);
        setVideoError("");

        axios
            .get("/api/courses/youtube/search", {
                params: { q, maxResults: max },
            })
            .then((res) => {
                const list = normalizeYoutubeResponse(res.data);
                setVideos(Array.isArray(list) ? list : []);
            })
            .catch((err) => {
                console.error("Erreur vidéos YouTube :", err);
                setVideos([]);
                setVideoError("Impossible de charger les vidéos YouTube.");
            })
            .finally(() => setVideoLoading(false));
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const q = (query || "").trim();
        if (!q) return;
        fetchYoutubeVideos(q, maxResults);
    }

    function handleSearchByUrl() {
        setUrlError("");

        const id = extractVideoId(videoUrl.trim());
        if (!id) {
            setUrlError("URL YouTube invalide. Exemple : https://youtu.be/VIDEO_ID");
            return;
        }

        // Avec ton backend actuel, on n'a pas /videos?id=...
        // Donc on fait une recherche en utilisant l'ID comme query + maxResults=1
        // (YouTube retrouve généralement la vidéo via son ID)
        fetchYoutubeVideos(id, 1);
    }

    const coursesCount = useMemo(() => courses.length, [courses]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <section>
            {/* ===== COURSES ===== */}
            <h2 className="page-title">Liste des cours ({coursesCount})</h2>
            <p className="page-subtitle">
                Données exposées par le microservice <strong>course-service</strong>.
            </p>

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
                    {courses.map((c, index) => (
                        <tr key={c.id ?? index}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.category}</td>
                            <td>{c.duration}</td>
                            <td>{c.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* ===== VIDEOS ===== */}
            <div style={{ marginTop: "3rem" }}>
                <h3 className="page-title" style={{ fontSize: "1.3rem" }}>
                    🎥 Vidéos pédagogiques recommandées
                </h3>
                <p className="page-subtitle">
                    Ressources externes récupérées via l’API YouTube (WebClient backend).
                </p>

                {/* --- Recherche par mots-clés --- */}
                <form
                    onSubmit={handleSearchSubmit}
                    style={{
                        display: "flex",
                        gap: "0.8rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginTop: "1rem",
                    }}
                >
                    <input
                        className="input"
                        style={{ minWidth: 240 }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex: java, devops, docker..."
                    />

                    <input
                        className="input"
                        style={{ width: 120 }}
                        type="number"
                        min={1}
                        max={10}
                        value={maxResults}
                        onChange={(e) => setMaxResults(Number(e.target.value))}
                    />

                    <button type="submit" className="btn-primary">
                        Rechercher
                    </button>
                </form>

                {/* --- Recherche par URL --- */}
                <div style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                        <input
                            className="input"
                            style={{ minWidth: 320, flex: 1 }}
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Coller une URL YouTube (youtu.be/... ou watch?v=...)"
                        />
                        <button type="button" className="btn-secondary" onClick={handleSearchByUrl}>
                            Chercher via URL
                        </button>
                    </div>
                    {urlError && (
                        <p style={{ color: "#f87171", marginTop: "0.5rem" }}>{urlError}</p>
                    )}
                </div>

                {/* --- Etat vidéos --- */}
                {videoLoading ? (
                    <p style={{ marginTop: "1rem" }}>Chargement des vidéos...</p>
                ) : videoError ? (
                    <p style={{ color: "#f87171", marginTop: "1rem" }}>{videoError}</p>
                ) : videos.length === 0 ? (
                    <p style={{ marginTop: "1rem" }}>Aucune vidéo trouvée.</p>
                ) : (
                    <div className="cards-grid" style={{ marginTop: "1.5rem" }}>
                        {videos.map((v, index) => (
                            <article className="card" key={v.videoId ?? index}>
                                {v.thumbnail && (
                                    <img
                                        src={v.thumbnail}
                                        alt={v.title}
                                        style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "cover",
                                            borderRadius: "0.8rem",
                                            marginBottom: "0.8rem",
                                        }}
                                    />
                                )}

                                <h4 className="card-title" style={{ marginBottom: "0.8rem" }}>
                                    {v.title}
                                </h4>

                                <a
                                    href={`https://www.youtube.com/watch?v=${v.videoId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-secondary"
                                    style={{ display: "inline-block" }}
                                >
                                    Voir la vidéo
                                </a>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
