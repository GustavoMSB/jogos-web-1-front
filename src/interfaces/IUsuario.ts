import type { IEquipe } from "./IEquipe";

export type UsuarioEnum = "ALUNO" | "TECNICO" | "COORDENADOR" | "ADMINISTRADOR";


export interface IUsuario {
    idUsuario: number;
    matricula: string;
    nomeCompletoUsuario: string;
    apelidoUsuario: string;
    telefone: string;
    tipoUsuario: UsuarioEnum;
    equipes?: IEquipe[];
}
