import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "../../components/Dialog";
import api from "../../hooks/api";
import type { IEsporte } from "../../interfaces/IEsporte";
import type { IEvento } from "../../interfaces/IEvento";

export function Esportes() {
    const [listaEsportes, setListaEsportes] = useState([] as IEsporte[]);
    const [eventos, setEventos] = useState([] as IEvento[]);
    const [showDialog, setShowDialog] = useState(false);
    const [form, setForm] = useState({
        idEsporte: 0,
        nomeEsporte: "",
        numMinimoAtletas: 0,
        numMaximoAtletas: 0,
        idEvento: 0
    });

    const handleGetEsportes = async () => {
        try {
            api.get("/esportes").then(response => {
                setListaEsportes(response.data);
            });
        } catch (error) {
            console.error("Error fetching esportes data:", error);
        }
    };

    const handleGetEventos = async () => {
        try {
            api.get("/eventos").then(response => {
                setEventos(response.data);
            });
        } catch (error) {
            console.error("Error fetching eventos data:", error);
        }
    };

    useEffect(() => {
        handleGetEsportes();
        handleGetEventos();
    }, []);

    const clearForm = () => {
        setForm({
            idEsporte: 0,
            nomeEsporte: "",
            numMinimoAtletas: 0,
            numMaximoAtletas: 0,
            idEvento: 0
        });
    };

    const save = () => {
        if (form.nomeEsporte.trim() === "") {
            alert("O nome do esporte é obrigatório.");
            return;
        }
        if (form.idEvento === 0) {
            alert("Selecione um evento.");
            return;
        }
        if (form.numMinimoAtletas > form.numMaximoAtletas) {
            alert("Numero de participantes minimos maiores que os maximos.")
        }
        api.post("/esportes", {
            nomeEsporte: form.nomeEsporte,
            numMinimoAtletas: form.numMinimoAtletas,
            numMaximoAtletas: form.numMaximoAtletas,
            idEvento: form.idEvento
        }).then(() => {
            handleGetEsportes();
            setShowDialog(false);
            clearForm();
        }).catch(err => console.error("Error saving esporte:", err));
    };

    const edit = (esporte: IEsporte) => {
        if (esporte.nomeEsporte.trim() === "") {
            alert("O nome do esporte é obrigatório.");
            return;
        }
        if (!esporte.evento?.idEvento) {
            alert("O evento é obrigatório.");
            return;
        }
        if (form.numMinimoAtletas > form.numMaximoAtletas) {
            alert("Numero de participantes minimos maiores que os maximos.")
        }

        api.put(`/esportes/${esporte.idEsporte}`, {
            nomeEsporte: esporte.nomeEsporte,
            numMinimoAtletas: esporte.numMinimoAtletas,
            numMaximoAtletas: esporte.numMaximoAtletas,
            idEvento: esporte.evento.idEvento
        }).then(() => {
            handleGetEsportes();
            setShowDialog(false);
            clearForm();
        }).catch(err => console.error("Error editing esporte:", err));
    };

    return (
        <DefaultContainer>
            <Container fluid className="text-white p-4 h-100 bg-dark">
                <Row>
                    <Col md={12}>
                        <h1>Esportes Page</h1>
                    </Col>
                    <Col md={12} className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Lista de Esportes</h4>
                            <Button className="btn btn-primary" onClick={() => setShowDialog(true)}>Adicionar Esporte</Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Esporte</th>
                                    <th>Min. Atletas</th>
                                    <th>Max. Atletas</th>
                                    <th>Evento</th>
                                    <th className="text-center" style={{ width: "30px" }}>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaEsportes.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">Nenhum esporte encontrado.</td>
                                    </tr>
                                ) : listaEsportes.map((e) => (
                                    <tr key={e.idEsporte}>
                                        <td>{e.idEsporte}</td>
                                        <td>{e.nomeEsporte}</td>
                                        <td>{e.numMinimoAtletas}</td>
                                        <td>{e.numMaximoAtletas}</td>
                                        <td>Evento {e.evento?.idEvento}</td>
                                        <td className="text-center">
                                            <button
                                                className="bg-transparent border-0"
                                                onClick={() => {
                                                    setForm({
                                                        idEsporte: e.idEsporte,
                                                        nomeEsporte: e.nomeEsporte,
                                                        numMinimoAtletas: e.numMinimoAtletas,
                                                        numMaximoAtletas: e.numMaximoAtletas,
                                                        idEvento: e.evento?.idEvento || 0
                                                    });
                                                    setShowDialog(true);
                                                }}
                                            >
                                                <FaEdit color="#fff" size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Dialog
                show={showDialog}
                title={form.idEsporte && form.idEsporte > 0 ? "Editar Esporte" : "Adicionar Esporte"}
                onClose={() => setShowDialog(false)}
                onConfirm={() => {
                    if (form.idEsporte && form.idEsporte > 0) {
                        edit({
                            idEsporte: form.idEsporte,
                            nomeEsporte: form.nomeEsporte,
                            numMinimoAtletas: form.numMinimoAtletas,
                            numMaximoAtletas: form.numMaximoAtletas,
                            evento: { idEvento: form.idEvento } as IEvento
                        });
                    } else {
                        save();
                    }
                }}
            >
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nome do Esporte</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            value={form.nomeEsporte}
                            onChange={(e) => setForm({ ...form, nomeEsporte: e.target.value })}
                        />
                        <label className="form-label mt-3">Número mínimo de atletas</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-light border-secondary"
                            value={form.numMinimoAtletas}
                            onChange={(e) => setForm({ ...form, numMinimoAtletas: Number(e.target.value) })}
                        />
                        <label className="form-label mt-3">Número máximo de atletas</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-light border-secondary"
                            value={form.numMaximoAtletas}
                            onChange={(e) => setForm({ ...form, numMaximoAtletas: Number(e.target.value) })}
                        />
                        <label className="form-label mt-3">Evento</label>
                        <Form.Select
                            className="bg-dark text-light border-secondary"
                            value={form.idEvento}
                            onChange={(e) => setForm({ ...form, idEvento: Number(e.target.value) })}
                        >
                            <option value={0}>Selecione um evento</option>
                            {eventos.map(ev => (
                                <option key={ev.idEvento} value={ev.idEvento}>
                                    Evento {ev?.idEvento}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </form>
            </Dialog>
        </DefaultContainer>
    );
}
