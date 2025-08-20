import React, { useMemo, useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Form,
    Button,
    Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Tipos auxiliares
type Theme = "light" | "dark";

// Componente da Navbar 100% funcional
function AppNavbar() {
    const [activeKey, setActiveKey] = useState<string>("home");
    const [theme, setTheme] = useState<Theme>("light");

    // Classes/props derivados do tema
    const variant = theme;
    const bg = theme;

    const handleSelect = (eventKey: string | null) => {
        if (!eventKey) return;
        setActiveKey(eventKey);
    };

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const q = String(data.get("q") || "").trim();
        if (q) alert(`Buscar por: ${q}`);
    };

    return (
        <Navbar expand="lg" bg={bg} variant={variant} sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand href="#" onClick={() => setActiveKey("home")}>
                    <strong>MinhaApp</strong> <Badge bg={theme === "dark" ? "secondary" : "primary"}>v1</Badge>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto" activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Link eventKey="home" href="#home">Início</Nav.Link>
                        <Nav.Link eventKey="features" href="#features">Recursos</Nav.Link>
                        <Nav.Link eventKey="pricing" href="#pricing">Preços</Nav.Link>
                        <NavDropdown title="Mais" id="nav-dropdown">
                            <NavDropdown.Item eventKey="docs" href="#docs">Documentação</NavDropdown.Item>
                            <NavDropdown.Item eventKey="blog" href="#blog">Blog</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="support" href="#support">Suporte</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Form className="d-flex gap-2 align-items-center" onSubmit={onSearch}>
                        <Form.Control
                            name="q"
                            type="search"
                            placeholder="Pesquisar..."
                            aria-label="Pesquisar"
                        />
                        <Button type="submit">Buscar</Button>
                        <Form.Check
                            type="switch"
                            id="theme-switch"
                            label={theme === "dark" ? "Dark" : "Light"}
                            checked={theme === "dark"}
                            onChange={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Exemplo de página com conteúdo para demonstrar a navbar
const Section: React.FC<{ id: string; title: string; children?: React.ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="py-5">
        <Container>
            <h2 className="mb-3">{title}</h2>
            <p className="lead mb-0">{children}</p>
        </Container>
    </section>
);

export default function App() {
    // Apenas conteúdo de demonstração
    const lorem = useMemo(
        () =>
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel nisl at augue gravida posuere. ` +
            `Integer non orci vitae dolor tristique luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; ` +
            `Donec fringilla, quam a aliquet cursus, nisl elit elementum mauris, vitae vehicula nisl lacus vitae urna.`,
        []
    );

    return (
        <>
            <AppNavbar />
            <main>
                <Section id="home" title="Início">{lorem}</Section>
                <Section id="features" title="Recursos">{lorem}</Section>
                <Section id="pricing" title="Preços">{lorem}</Section>
                <Section id="docs" title="Documentação">{lorem}</Section>
                <Section id="blog" title="Blog">{lorem}</Section>
                <Section id="support" title="Suporte">{lorem}</Section>
            </main>
            <footer className="py-4 border-top">
                <Container>
                    <small>© {new Date().getFullYear()} MinhaApp — Exemplo com React-Bootstrap</small>
                </Container>
            </footer>
        </>
    );
}
