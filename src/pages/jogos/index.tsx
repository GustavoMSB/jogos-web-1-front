import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultContainer } from "../../components/DefaultLayout";
import api from "../../hooks/api";
import { Col, Row, Table } from "react-bootstrap";
import type { IJogo } from "../../interfaces/IJogo";
import dayjs from "dayjs";


export function Jogos() {

    const [jogos, setJogos] = useState<IJogo[]>([]);

    useEffect(() => {
        api.get("/jogos")
            .then(res => setJogos(res.data))
    }, []);


    return (
        <DefaultContainer>
            <Row>
                <Col md={12}>
                    <div className="d-flex justify-content-between mb-4">
                        <h1>Jogos</h1>
                        <Link to="/jogos/novo">
                            <button>Novo Jogo</button>
                        </Link>
                    </div>
                </Col>
                <Col md={12}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Confronto</th>
                                <th>Esporte</th>
                                <th>Ano</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jogos.length > 0 && jogos.map(jogo => (
                                <tr key={jogo.idJogo}>
                                    <td>{jogo.idJogo}</td>

                                    <td>{jogo.nomeEquipe1 ?? ""} x {jogo.nomeEquipe2 ?? ""}</td>

                                    <td>{jogo.nomeEsporte}</td>
                                    <td>{dayjs(jogo.data ?? dayjs()).format("DD/MM/YYYY [as] HH:mm")}</td>
                                    <td>
                                        <Link to={`/jogos/${jogo.idJogo}/editar`}>
                                            <button>Editar</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </DefaultContainer>
    );
}