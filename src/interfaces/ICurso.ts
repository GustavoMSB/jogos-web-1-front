export type EnumCurso = "INTEGRADO" | "TECNICO" | "SUPERIOR" | "SUBSEQUENTE";

export interface ICurso {
    idCurso: number;
    nomeCurso: string;
    tipoCurso: EnumCurso;
    idCoordenadorFK: string;
}
