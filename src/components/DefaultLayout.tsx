import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "bootstrap";
import './styles.css';

interface ContainerProps {
    children: ReactNode;
}

export function DefaultContainer({ children }: ContainerProps) {
    const route = window.location.pathname;
    const navigate = useNavigate();

    const menuItems = [
        { path: "/", label: "Dashboard" },
        { path: "/campus", label: "Campus" },
        { path: "/cursos", label: "Cursos" },
        // { path: "/equipes", label: "Equipes" },
        { path: "/esportes", label: "Esportes" },
        { path: "/eventos", label: "Eventos" },
        // { path: "/grupos", label: "Grupos" },
        // { path: "/jogos", label: "Jogos" },
        // { path: "/usuarios", label: "Usuários" },
    ];

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* Sidebar fixa no desktop */}
            <div
                className="bg-dark text-white p-3 border-end d-none d-md-block"
                style={{ width: "250px" }}
            >
                <h3
                    className="text-primary fw-bold mb-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    JogosIFS
                </h3>
                <ul className="nav flex-column">
                    {menuItems.map((item) => (
                        <li className="nav-item mb-2" key={item.path}>
                            <button
                                className={`nav-link text-start w-100 ${route === item.path ? "active fw-bold text-primary" : "text-white"
                                    }`}
                                style={{ background: "transparent", border: "none" }}
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Conteúdo */}
            <div className="flex-grow-1 bg-light">
                {/* Navbar topo no mobile */}
                <nav className="navbar navbar-dark bg-dark d-md-none">
                    <div className="container-fluid">
                        <button
                            className="btn btn-outline-light"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#mobileSidebar"
                            aria-controls="mobileSidebar"
                        >
                            ☰
                        </button>
                        <span className="navbar-brand mb-0 h1">JogosIFS</span>
                    </div>
                </nav>

                {/* Sidebar mobile (offcanvas) */}
                <div
                    className="offcanvas offcanvas-start bg-dark text-white"
                    tabIndex={-1}
                    id="mobileSidebar"
                    aria-labelledby="mobileSidebarLabel"
                    style={{ width: "250px" }}
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title text-primary fw-bold" id="mobileSidebarLabel">
                            JogosIFS
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav flex-column">
                            {menuItems.map((item) => (
                                <li className="nav-item mb-2" key={item.path}>
                                    <button
                                        className={`nav-link text-start w-100 ${route === item.path
                                            ? "active fw-bold text-primary"
                                            : "text-white"
                                            }`}
                                        style={{ background: "transparent", border: "none" }}
                                        onClick={() => {
                                            navigate(item.path);
                                            // fecha o menu automaticamente
                                            const offcanvasEl = document.getElementById("mobileSidebar");
                                            if (offcanvasEl) {
                                                const offcanvas = Offcanvas.getInstance(offcanvasEl);
                                                offcanvas?.hide();
                                            }
                                        }
                                        }
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Conteúdo da página */}
                <div className="wrapper p-4 bg-dark text-white flex-grow-1">{children}</div>
            </div>
        </div>
    );
}
