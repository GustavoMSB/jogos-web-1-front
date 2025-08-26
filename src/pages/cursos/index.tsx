import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { DefaultContainer } from "../../components/DefaultLayout";
import type { EnumCurso, ICurso } from "../../interfaces/ICurso";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "../../components/Dialog";
import api from "../../hooks/api";
import type { IUsuario } from "../../interfaces/IUsuario";

export function Cursos() {
    const [listaCursos, setListaCursos] = useState([] as ICurso[]);
    const [showDialog, setShowDialog] = useState(false);
    const [form, setForm] = useState({
        nomeCurso: "",
        tipoCurso: "",
        idCurso: 0,
        idCoordenadorFK: 0
    });
    const [coordenadores, setCoordenadores] = useState([] as IUsuario[])

    const handleGetCursos = async () => {
        try {
            api.get('/cursos').then(response => {
                setListaCursos(response.data);
            });
        } catch (error) {
            console.error("Error fetching cursos data:", error);
        }
    };

    useEffect(() => {
        handleGetCursos();
        handleGetCoordenadores()
    }, []);

    const clearForm = () => {
        setForm({ nomeCurso: "", tipoCurso: "", idCurso: 0, idCoordenadorFK: 0 });
    };

    const handleGetCoordenadores = () => {
        try {
            api.get("/usuarios/coordenadores")
                .then(rs => {
                    console.log(rs.data)
                    setCoordenadores(rs.data)
                })

        } catch (err) {
            console.error("Error fetching cursos data:", err)
        }
    }

    const save = () => {
        try {
            if (form.nomeCurso.trim() === "") {
                alert("O nome do curso é obrigatório.");
                return;
            }
            if (form.tipoCurso.trim() === "") {
                alert("O tipo do curso é obrigatório.");
                return;
            }
            api.post('/cursos', {
                nomeCurso: form.nomeCurso,
                tipoCurso: form.tipoCurso
            }).then(() => {
                handleGetCursos();
                setShowDialog(false);
                clearForm();
            });
        } catch (error) {
            console.error("Error saving curso data:", error);
        }
    };

    const edit = (curso: ICurso) => {
        try {
            if (curso.nomeCurso.trim() === "") {
                alert("O nome do curso é obrigatório.");
                return;
            }
            if (curso.tipoCurso.trim() === "") {
                alert("O tipo do curso é obrigatório.");
                return;
            }
            if (curso.idCurso && curso.idCurso == 0) {
                alert("o curso é obrigatório.");
                return;
            }
            if (curso.idCoordenadorFK && curso.idCoordenadorFK == 0) {
                alert("O coordenador é obrigatório.");
                return
            }
            api.put(`/cursos/${curso.idCurso}`, {
                nomeCurso: curso.nomeCurso,
                tipoCurso: curso.tipoCurso,
                idCoordenadorFK: curso.idCoordenadorFK
            }).then(() => {
                handleGetCursos();
                setShowDialog(false);
                clearForm();
            });
        } catch (error) {
            console.error("Error editing curso data:", error);
        }
    };

    return (
        <DefaultContainer>
            <Container fluid className="text-white p-4 h-100 bg-dark">
                <Row>
                    <Col md={12}>
                        <h1>Cursos Page</h1>
                    </Col>
                    <Col md={12} className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Lista de Cursos</h4>
                            <Button className="btn btn-primary" onClick={() => setShowDialog(true)}>Adicionar Curso</Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Curso</th>
                                    <th>Tipo do Curso</th>
                                    <th className="text-center"
                                        style={{ width: '30px' }}>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaCursos.length === 0 ?
                                    (<tr><td colSpan={2} className="text-center">Nenhum campus encontrado.</td></tr>
                                    )
                                    : listaCursos.map((c) => (
                                        <tr key={c.idCurso}>
                                            <td>{c.idCurso}</td>
                                            <td>{c.nomeCurso}</td>
                                            <td>{c.tipoCurso}</td>
                                            <td className="text-center">
                                                <button className="bg-transparent border-0"
                                                    onClick={() => {
                                                        setForm({
                                                            idCoordenadorFK: Number(c.idCoordenadorFK),
                                                            idCurso: c.idCurso,
                                                            nomeCurso: c.nomeCurso,
                                                            tipoCurso: c.tipoCurso
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
                title={form.idCurso && form.idCurso > 0 ? "Editar Curso" : "Adicionar Curso"}
                onClose={() => {

                    setShowDialog(false)
                }}
                onConfirm={() => {
                    if (form.idCurso && form.idCurso > 0) {
                        edit({ ...form, idCoordenadorFK: Number(form.idCoordenadorFK), tipoCurso: form.tipoCurso as EnumCurso });
                    } else {
                        save();
                    }
                }}
            >
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nome do Curso</label>
                        <input type="text" className="form-control bg-dark text-light border-secondary"
                            value={form.nomeCurso}
                            onChange={(e) => setForm({ ...form, nomeCurso: e.target.value })}
                        />
                        <label className="form-label mt-3">Tipo do Curso</label>
                        <Form.Select aria-label="Tipo do Curso" className=" bg-dark text-light border-secondary" value={form.tipoCurso}
                            onChange={(e) => setForm({ ...form, tipoCurso: e.target.value })}
                        >
                            <option value="INTEGRADO">Integrado</option>
                            <option value="TECNICO">Técnico</option>
                            <option value="SUPERIOR">Superior</option>
                            <option value="SUBSEQUENTE">Subsequente</option>
                        </Form.Select>
                        <label className="form-label mt-3">Coordenador</label>
                        <Form.Select aria-label="Tipo do Curso" className=" bg-dark text-light border-secondary" value={form.idCoordenadorFK}
                            onChange={(e) => setForm({ ...form, idCoordenadorFK: Number(e.target.value) })}
                        >
                            {coordenadores.length > 0 && coordenadores.map((cord) => (
                                <option key={cord.idUsuario} value={cord.idUsuario}>{cord.nomeCompletoUsuario}</option>
                            ))}
                        </Form.Select>
                    </div>
                </form>
            </Dialog>
        </DefaultContainer>
    );
}