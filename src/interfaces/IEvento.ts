import type { EnumCurso } from "./ICurso";

export interface IEvento {
    idEvento: number;
    dataHoraEvento: string; // LocalDateTime → string
    tipoEvento: EnumCurso;
    idOrganizadorFK: string;
}
