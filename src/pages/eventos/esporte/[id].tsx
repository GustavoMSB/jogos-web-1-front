import { useParams } from "react-router-dom";
import { DefaultContainer } from "../../../components/DefaultLayout";
import { useEffect, useState } from "react";
import api from "../../../hooks/api";
import type { IEsporte } from "../../../interfaces/IEsporte";
import { Col, Row } from "react-bootstrap";
import type { IClassificacao, IGrupo } from "../../../interfaces/IGrupo";
import { GrupoCard } from "../../../components/Grupo";

export function EsporteByEvento() {
    const { id_evento, id_esporte } = useParams();
    const [esporte, setEsporte] = useState({} as IEsporte);
    const [grupos, setGrupos] = useState([] as IGrupo[]);

    const getEsportesById = async () => {
        if (!esporte.idEsporte) return;
        try {
            await api.get(`/esportes/${esporte.idEsporte}`)
                .then(rs => setEsporte(rs.data))
        } catch (err) {
            console.error(err)
        }
    }
    const getGrupos = async () => {
        try {
            const rs = await api.get(`/grupos/getByEsporte/${id_esporte}`);
            let grupos: IGrupo[] = rs.data;

            if (grupos.length > 0) {
                grupos = await Promise.all(
                    grupos.map(async (gr) => {
                        if (gr.idGrupo) {
                            const classi = await getClassificacao(gr.idGrupo);
                            if (classi) {
                                gr.classificacao = classi;
                            }
                        }
                        return gr;
                    })
                );
            }

            setGrupos(grupos);
        } catch (err) {
            console.error(err);
        }
    };

    const getClassificacao = async (idGrupo: number) => {
        try {
            const rs = await api.get(`/jogos/classificacao/${idGrupo}`);
            return rs.data as IClassificacao[];
        } catch (err) {
            console.error(err);
            return [];
        }
    };


    useEffect(() => {
        getGrupos();
        getEsportesById();
    }, [id_esporte]);

    return (
        <DefaultContainer>
            <h1>Grupos do evento {id_evento} no Esporte: {esporte.nomeEsporte ?? ""}</h1>
            <Row>
                {grupos.length > 0 && grupos.map(grupo => {
                    return (
                        <Col md={4} key={grupo.idGrupo}>
                            <GrupoCard
                                grupo={grupo}
                                esporte={grupo.esporte.nomeEsporte}
                                classificacao={grupo.classificacao}
                            />
                        </Col>

                    )
                })}
            </Row>
        </DefaultContainer>
    )
}