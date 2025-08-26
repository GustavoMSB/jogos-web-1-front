import { useEffect, useState } from "react";
import { DefaultContainer } from "../../../components/DefaultLayout";
import { useParams } from "react-router-dom";
import api from "../../../hooks/api";
import type { IGrupo } from "../../../interfaces/IGrupo";
import type { IEquipe } from "../../../interfaces/IEquipe";
import { Col, Row, Card, Table, Spinner, Modal, Button, Form } from "react-bootstrap";
import type { IJogo } from "../../../interfaces/IJogo";

export function JogosDoGrupo() {
    const { id_grupo } = useParams();
    const [grupo, setGrupo] = useState({} as IGrupo);
    const [equipes, setEquipes] = useState<IEquipe[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para o Dialog
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<"editar" | "wo" | "desfazer" | null>(null);
    const [selectedJogo, setSelectedJogo] = useState<IJogo | null>(null);
    const [placar, setPlacar] = useState({ equipe1: 0, equipe2: 0 });
    const [equipeWoSelecionada, setEquipeWoSelecionada] = useState<number | null>(null);

    const getEquipesByGrupo = async () => {
        if (grupo.esporte) {
            const rs = await api.get("equipes/getByGrupo/" + grupo.idGrupo);
            const equipes: IEquipe[] = rs.data;

            const equipesComJogos = await Promise.all(
                equipes.map(async (e) => {
                    const jogos = await getJogosPorEquipe(e.idEquipe);
                    return { ...e, jogos };
                })
            );

            setEquipes(equipesComJogos);
            setLoading(false);
        }
    };

    const getGrupo = async () => {
        const rs = await api.get("grupos/" + id_grupo);
        setGrupo(rs.data);
    };

    const getJogosPorEquipe = async (id: number) => {
        try {
            const jogos = await api.get(`/jogos/equipe/${id}`).then((rs) => rs.data);
            return jogos as IJogo[];
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    useEffect(() => {
        getGrupo();
    }, []);

    useEffect(() => {
        if (grupo.idGrupo) {
            getEquipesByGrupo();
        }
    }, [grupo]);

    // ---- Funções Dialog ----


    const abrirDialogEditar = (jogo: IJogo) => {
        setSelectedJogo(jogo);
        setPlacar({
            equipe1: jogo.placarEquipe1,
            equipe2: jogo.placarEquipe2,
        });
        setDialogMode("editar");
        setShowDialog(true);
    };


    const fecharDialog = () => {
        setShowDialog(false);
        setDialogMode(null);
        setSelectedJogo(null);
    };

    const confirmarAcao = async () => {
        if (!selectedJogo) return;

        if (dialogMode === "editar") {
            await api.put(`/jogos/${selectedJogo.idJogo}/resultado`, {
                placarEquipe1: Number(placar.equipe1),
                placarEquipe2: Number(placar.equipe2),
            });
        }

        if (dialogMode === "wo") {
            if (!equipeWoSelecionada) return;
            await api.post(`/jogos/${selectedJogo.idJogo}/wo?equipeWo=${equipeWoSelecionada}`);
        }

        if (dialogMode === "desfazer") {
            await api.post(`/jogos/${selectedJogo.idJogo}/desfazer-wo`);
        }

        fecharDialog();
        getEquipesByGrupo();
    };

    return (
        <DefaultContainer>
            <Row>
                <Col md={12}>
                    <div className="d-flex justify-content-between"><h1 className="mb-4">Jogos do {grupo.nomeGrupo}</h1>
                        <button className="bg-dark text-white">
                            Gerar Eliminatorias</button></div>

                </Col>
            </Row>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {equipes.map((equipe) => (
                        <Col md={6} key={equipe.idEquipe} className="mb-4">
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Title>
                                        {equipe.nomeEquipe}
                                    </Card.Title>
                                    {equipe.jogos && equipe.jogos.length > 0 ? (
                                        <Table striped bordered hover size="sm" className="mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Adversário</th>
                                                    <th>Placar</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {equipe.jogos.map((jogo: IJogo) => (
                                                    <tr key={jogo.idJogo}>
                                                        <td>
                                                            {equipe.nomeEquipe === jogo.nomeEquipe1 ? jogo.nomeEquipe2 : jogo.nomeEquipe1}
                                                        </td>
                                                        <td>
                                                            {jogo.placarEquipe1 ?? "-"} x {jogo.placarEquipe2 ?? "-"}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="bg-light text-dark"
                                                                onClick={() => abrirDialogEditar(jogo)}
                                                            >
                                                                Editar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <p className="text-muted mt-3">Nenhum jogo encontrado</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* ---- Dialog ---- */}
            <Modal
                show={showDialog}
                onHide={fecharDialog}
                size="lg"
                centered
                contentClassName="bg-dark text-light rounded-3 shadow-lg"
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                        {dialogMode === "editar" && "Editar Placar"}
                        {dialogMode === "wo" && "Gerar WO"}
                        {dialogMode === "desfazer" && "Desfazer WO"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {dialogMode === "editar" && selectedJogo && (
                        <div className="d-flex gap-3">
                            <Form.Group>
                                <Form.Label>{selectedJogo.nomeEquipe1}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={placar.equipe1}
                                    onChange={(e) => setPlacar({ ...placar, equipe1: Number(e.target.value) })}
                                />
                                <button className="mt-2" onClick={() => {

                                    setPlacar({ equipe1: 0, equipe2: 3 })
                                }}>WO</button>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>{selectedJogo.nomeEquipe2}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={placar.equipe2}
                                    onChange={(e) => setPlacar({ ...placar, equipe2: Number(e.target.value) })}
                                />
                                <button className="mt-2" onClick={() => {
                                    setPlacar({ equipe1: 3, equipe2: 0 })
                                }}>WO</button>
                            </Form.Group>
                        </div>
                    )}

                    {dialogMode === "wo" && selectedJogo && (
                        <div>
                            <p>
                                Escolha a equipe que <b>perdeu por WO</b> no jogo <br />
                                <strong>
                                    {selectedJogo.nomeEquipe1} x {selectedJogo.nomeEquipe2}
                                </strong>
                            </p>
                            <Form.Select
                                value={equipeWoSelecionada ?? ""}
                                onChange={(e) => setEquipeWoSelecionada(Number(e.target.value))}
                            >
                                <option value="">-- Selecione a equipe --</option>
                                <option value={selectedJogo.equipe1.idEquipe}>{selectedJogo.nomeEquipe1}</option>
                                <option value={selectedJogo.equipe2.idEquipe}>{selectedJogo.nomeEquipe2}</option>
                            </Form.Select>
                        </div>
                    )}

                    {dialogMode === "desfazer" && selectedJogo && (
                        <p>
                            Deseja realmente <b>desfazer o WO</b> do jogo <br />
                            <strong>
                                {selectedJogo.nomeEquipe1} x {selectedJogo.nomeEquipe2}
                            </strong>?
                        </p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharDialog}>
                        Cancelar
                    </Button>
                    <Button
                        variant={dialogMode === "desfazer" ? "warning" : "primary"}
                        onClick={confirmarAcao}
                    >
                        {dialogMode === "editar" && "Salvar Placar"}
                        {dialogMode === "wo" && "Confirmar WO"}
                        {dialogMode === "desfazer" && "Desfazer WO"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </DefaultContainer>
    );
}
