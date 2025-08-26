import { Card, Col, Container, Row } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import { useParams } from "react-router-dom";
import api from "../../hooks/api";
import { useEffect, useState } from "react";
import type { IEsporte } from "../../interfaces/IEsporte";
import type { IEvento } from "../../interfaces/IEvento";


export function Evento() {
    const { id } = useParams();
    const [evento, setEvento] = useState({} as IEvento)
    const [esportes, setEsportes] = useState([] as IEsporte[]);

    async function getEvento() {
        if (!id) return;

        try {
            await api.get(`eventos/${id}`)
                .then(rs => setEvento(rs.data))
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (id && Number(id) > 0) {
            getEvento()
        }
    }, [id])

    const getEsportes = async () => {
        if (!evento.idEvento) return;
        try {
            await api.get(`/esportes/evento/${evento.idEvento}`)
                .then(rs => setEsportes(rs.data))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (evento.idEvento) {
            getEsportes()
        }
    }, [evento])

    return (
        <DefaultContainer>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4">Evento {evento.idEvento}</h1>
                    </Col>
                    <Col md={12}>
                        <h3>Esportes</h3></Col>
                    {esportes.length > 0 && esportes.map(es => (
                        <Col md={4} key={es.idEsporte}>
                            <Card>
                                <Card.Title className="text-center mt-4">{es.nomeEsporte}</Card.Title>
                                <Card.Footer className="text-center">
                                    <Card.Link href={`/eventos/${evento.idEvento}/esportes/${es.idEsporte}`} className="btn btn-primary">Ir para {es.nomeEsporte}</Card.Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </DefaultContainer>
    )
}