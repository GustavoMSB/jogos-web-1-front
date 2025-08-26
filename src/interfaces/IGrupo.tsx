import type { IEsporte } from "./IEsporte";

export interface IClassificacao {
    idEquipe: number;
    nomeEquipe: string;
    pontos: number;
};
export interface IGrupo {
    idGrupo: number;
    nomeGrupo: string;
    esporte: IEsporte;
    classificacao: IClassificacao[];
}
