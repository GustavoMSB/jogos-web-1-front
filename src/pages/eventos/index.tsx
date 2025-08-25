import { Card, Col, Row } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import { useEffect, useState } from "react";
import type { IEvento } from "../../interfaces/IEvento";
import api from "../../hooks/api";
import dayjs from "dayjs";

export function Eventos() {
    const [listEventos, setListaEventos] = useState([] as IEvento[]);

    const handleGetEventos = () => {
        try {
            api.get("/eventos")
                .then(rs => {
                    setListaEventos(rs.data)
                })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        handleGetEventos()
    }, [])


    return (
        <DefaultContainer>
            <div className="text-white p-4 d-flex flex-column" style={{ minHeight: "100vh" }}>
                <Row>
                    <Col md={12}>
                        <h1>Eventos</h1>
                    </Col>
                    {listEventos.length > 0 && listEventos.map(ev => (
                        <Col md={4} key={ev.idEvento}>
                            <Card>
                                <Card.Title className="text-center mt-2">{ev.idEvento}</Card.Title>
                                <Card.Body>
                                    {dayjs(ev.dataHoraEvento).format("DD/MM/YYYY [às] HH:mm")}
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link href={`/eventos/${ev.idEvento}`} className="btn btn-primary">Ir para Esportes</Card.Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>

        </DefaultContainer>
    );
}