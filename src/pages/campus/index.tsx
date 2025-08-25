import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import { useEffect, useState } from "react";
import type { ICampus } from "../../interfaces/ICampus";
import api from "../../hooks/api";
import { Dialog } from "../../components/Dialog";
import { FaEdit } from "react-icons/fa";

export const Campus: React.FC = () => {
    const [listaCampus, setListaCampus] = useState([] as ICampus[]);
    const [showDialog, setShowDialog] = useState(false);
    const [form, setForm] = useState({
        cidadeCampus: "",
        idCampus: 0
    });

    const handleGetCampus = async () => {
        try {
            api.get('/campus').then(response => {
                setListaCampus(response.data);
            });
        } catch (error) {
            console.error("Error fetching campus data:", error);
        }
    };

    const clearForm = () => {
        setForm({ cidadeCampus: "", idCampus: 0 });
    };

    const save = () => {
        try {
            if (form.cidadeCampus.trim() === "") {
                alert("O nome do campus é obrigatório.");
                return;
            }
            api.post('/campus', {
                cidadeCampus: form.cidadeCampus
            }).then(() => {
                handleGetCampus();
                setShowDialog(false);
                clearForm();
            });
        } catch (error) {
            console.error("Error saving campus data:", error);
        }
    };

    const edit = (campus: ICampus) => {
        try {
            if (campus.cidadeCampus.trim() === "") {
                alert("O nome do campus é obrigatório.");
                return;
            }
            if (campus.idCampus && campus.idCampus == 0) {
                return;
            }
            api.put(`/campus/${campus.idCampus}`, {
                cidadeCampus: campus.cidadeCampus
            }).then(() => {
                handleGetCampus();
                setShowDialog(false);
                clearForm();
            });
        } catch (error) {
            console.error("Error editing campus data:", error);
        }
        setForm(campus);
        setShowDialog(true);
    };

    useEffect(() => {
        handleGetCampus();
    }, []);

    return (
        <DefaultContainer>
            <Container fluid className="text-white p-4 h-100 bg-dark">
                <Row>
                    <Col md={12}>
                        <h1>Campus Page</h1>
                    </Col>
                    <Col md={12} className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Lista de Campus</h4>
                            <Button className="btn btn-primary" onClick={() => setShowDialog(true)}>Adicionar Campus</Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Campus</th>
                                    <th className="text-center"
                                        style={{ width: '30px' }}>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaCampus.length === 0 ?
                                    (<tr><td colSpan={2} className="text-center">Nenhum campus encontrado.</td></tr>
                                    )
                                    : listaCampus.map((c) => (
                                        <tr key={c.idCampus}>
                                            <td>{c.idCampus}</td>
                                            <td>{c.cidadeCampus}</td>
                                            <td className="text-center">
                                                <button className="bg-transparent border-0"
                                                    onClick={() => {
                                                        setForm(c);
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
                title={form.idCampus && form.idCampus > 0 ? "Editar Campus" : "Adicionar Campus"}
                onClose={() => setShowDialog(false)}
                onConfirm={() => {
                    if (form.idCampus && form.idCampus > 0) {
                        edit(form);
                    } else {
                        save();
                    }
                }}
            >
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nome do Campus</label>
                        <input type="text" className="form-control bg-dark text-light border-secondary"
                            value={form.cidadeCampus}
                            onChange={(e) => setForm({ ...form, cidadeCampus: e.target.value })}
                        />
                    </div>
                </form>
            </Dialog>
        </DefaultContainer>
    );
}
