import type { IEvento } from "./IEvento";

export interface IEsporte {
    idEsporte: number;
    nomeEsporte: string;
    numMinimoAtletas: number;
    numMaximoAtletas: number;
    evento: IEvento;
}
