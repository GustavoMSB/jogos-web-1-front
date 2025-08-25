import { Card, Col, Row } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";

export const Home: React.FC = () => {
    return (
        <DefaultContainer>
            <div className="text-white p-4" style={{ minHeight: '100vh' }}>
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
                    <Col md={3} className="text-center mt-4">
                        <Card className="bg-light">
                            <Card.Body>
                                <Card.Title>Eventos</Card.Title>
                                <Card.Text>
                                    Gerencie os eventos dos jogos
                                </Card.Text>
                                <Card.Footer className="text-muted">
                                    <Card.Link href="/eventos" className="btn btn-primary">Ir para Eventos</Card.Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center mt-4">
                        <Card className="bg-light">
                            <Card.Body>
                                <Card.Title>Usuários</Card.Title>
                                <Card.Text>
                                    Gerencie os usuários do sistema
                                </Card.Text>
                                <Card.Footer className="text-muted">
                                    <Card.Link href="/usuarios" className="btn btn-primary">Ir para Usuários</Card.Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center mt-4">
                        <Card className="bg-light">
                            <Card.Body>
                                <Card.Title>Cursos</Card.Title>
                                <Card.Text>
                                    Gerencie os cursos do IFS
                                </Card.Text>
                                <Card.Footer className="text-muted">
                                    <Card.Link href="/cursos" className="btn btn-primary">Ir para Cursos</Card.Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center mt-4">
                        <Card className="bg-light">
                            <Card.Body>
                                <Card.Title>Grupos</Card.Title>
                                <Card.Text>
                                    Gerencie os grupos dos jogos
                                </Card.Text>
                                <Card.Footer className="text-muted">
                                    <Card.Link href="/grupos" className="btn btn-primary">Ir para Grupos</Card.Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </DefaultContainer>

    );
}
