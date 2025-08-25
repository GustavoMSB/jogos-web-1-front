// @Data
// @Entity
// @Table(name = "Esporte")
// public class Esporte {
//     @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer idEsporte;
//     private String nomeEsporte;
//     private Integer numMinimoAtletas;
//     private Integer numMaximoAtletas;

//     @ManyToOne
//     @JoinColumn(name = "id_evento")
//     private Evento evento;
// }

export interface IEsporte {
    idEsporte: number;
    nomeEsporte: string;
    numMinimoAtletas: number;
    numMaximoAtletas: number;
    id_evento: number;
}