import { Col, Container, Row } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import { useParams } from "react-router-dom";
import api from "../../hooks/api";
import { useEffect } from "react";


export function Evento() {
    const { id } = useParams();

    function getEvento() {
        if (!id) return;

        try {
            api.get(`eventos/${id}`)
                .then(rs => console.log(rs.data))
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
    return (
        <DefaultContainer>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>Evento {id}</h1>
                    </Col>
                </Row>
            </Container>
        </DefaultContainer>
    )
}