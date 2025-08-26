import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { IGrupo } from "../../interfaces/IGrupo";

interface IClassificacao {
    idEquipe: number;
    nomeEquipe: string;
    pontos: number;
}

interface GrupoCardProps {
    grupo: IGrupo;
    esporte: string;
    classificacao: IClassificacao[];
}

export function GrupoCard({ grupo, esporte, classificacao }: GrupoCardProps) {
    const navigate = useNavigate();

    return (
        <Card className="shadow-lg border-0 mb-4" style={{ borderRadius: "1rem" }}>
            <Card.Header
                className="text-center fw-bold text-white"
                style={{ background: "linear-gradient(90deg, #007bff, #00c851)" }}
            >
                {grupo.nomeGrupo} 🏆
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-3 text-muted text-center">
                    Esporte: {esporte}
                </Card.Subtitle>

                <ListGroup variant="flush">
                    {classificacao.length > 0 ? (
                        classificacao.map((cl, index) => (
                            <ListGroup.Item
                                key={cl.idEquipe}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <span>
                                    <strong>{index + 1}º</strong> {cl.nomeEquipe}
                                </span>
                                <Badge bg="success" pill>
                                    {cl.pontos} pts
                                </Badge>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center text-muted">
                            Nenhuma equipe classificada ainda
                        </ListGroup.Item>
                    )}
                    <Button onClick={() => {
                        navigate(`/grupos/${grupo.idGrupo}/jogos/`)
                    }}>Ver jogos</Button>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
