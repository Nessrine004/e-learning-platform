// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Enrollments from './pages/Enrollments';
import Certificates from './pages/Certificates';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    <div className="app-header-top">
                        <span className="logo">E-Learning</span>

                    </div>

                    <nav className="navbar">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Accueil
                        </NavLink>

                        <NavLink
                            to="/courses"
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Cours
                        </NavLink>

                        <NavLink
                            to="/teachers"
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Enseignants
                        </NavLink>

                        <NavLink
                            to="/students"
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Étudiants
                        </NavLink>

                        <NavLink
                            to="/enrollments"
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Inscriptions
                        </NavLink>
                        <NavLink
                            to="/certificates"
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' nav-link-active' : '')
                            }
                        >
                            Certificats
                        </NavLink>

                    </nav>
                </header>

                <main className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/teachers" element={<Teachers />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/enrollments" element={<Enrollments />} />
                        <Route path="/certificates" element={<Certificates />} />

                    </Routes>
                </main>

                <footer className="app-footer">
                    <span>Plateforme E-Learning · EMSI · {new Date().getFullYear()}</span>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
