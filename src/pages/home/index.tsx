import { Card, Col, Row } from "react-bootstrap";

export const Home: React.FC = () => {
    return (
        <div className="container bg-dark text-white p-4 w-100 h-100" style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Row>
                <Col md={12} className="text-center mb-4">
                    <h1>Bem-vindo aos Jogos IFS</h1>
                    <p>Selecione uma opção no menu para começar</p>
                </Col>
                <Col md={3} className="text-center mt-4">
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title>Campus</Card.Title>
                            <Card.Text>
                                Gerencie os campi do IFS
                            </Card.Text>
                            <Card.Footer className="text-muted">
                                <Card.Link href="/campus" className="btn btn-primary">Ir para Campus</Card.Link>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="text-center mt-4">
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title>Esportes</Card.Title>
                            <Card.Text>
                                Gerencie os esportes dos jogos
                            </Card.Text>
                            <Card.Footer className="text-muted">
                                <Card.Link href="/esportes" className="btn btn-primary">Ir para Esportes</Card.Link>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
