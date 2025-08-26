import type { ICurso } from "./ICurso";
import type { ICampus } from "./ICampus";
import type { IEsporte } from "./IEsporte";
import type { IGrupo } from "./IGrupo";
import type { IUsuario } from "./IUsuario";
import type { IJogo } from "./IJogo";

export interface IEquipe {
    idEquipe: number;
    nomeEquipe: string;
    curso: ICurso;
    campus: ICampus;
    esporte: IEsporte;
    grupo: IGrupo;
    usuarios: IUsuario[];
    jogos: IJogo[];
}
