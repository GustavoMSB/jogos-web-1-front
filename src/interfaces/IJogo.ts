import type { IEquipe } from "./IEquipe";
import type { IEvento } from "./IEvento";
import type { IGrupo } from "./IGrupo";

export type JogoEnum = "PENDENTE" | "CONCLUIDO";

export interface IJogo {
    idJogo: number;
    evento: IEvento;
    equipe1: IEquipe;
    equipe2: IEquipe;
    data: string; // LocalDateTime → string
    hora: string;
    status: JogoEnum;
    placarEquipe1: number;
    placarEquipe2: number;
    wo: boolean;
    equipeWo: number;
    fase: string;
    ordemJogo: number;
    grupo: IGrupo;
    nomeEquipe1: string;
    nomeEquipe2: string;
    nomeEsporte: string;
}
