// interface Recibo {
//     AnoDataEmissao: Date;
//     DataEmissao: string;
//     FormaPagamento: FormaDePagamento;
//     NumeroRequisicao: number;
//     Rubrica: {
//         codigoRubrica: number;
//         DescricaoRubrica: string;
//         Tributacao: null | "S";
//     };
//     ValorBruto: number;
//     ValorCOFINS: number;
//     ValorCSLL: number;
//     ValorComissao: number;
//     ValorINSS: number;
//     ValorIR: number;
//     ValorIRRF: number;
//     ValorISS: number;
//     ValorLiquido: number;
//     ValorPIS: number;
// }

interface Niveis {
    label: string;
    value: number;
}

interface Area {
    label: string;
    value: number;
    profissoes: Profissao[];
}

interface Profissao {
    label: string;
    value: number;
    pontos: number[];
    area: Area;
}

interface Profissional {
    nome: string;
    sobrenome: string;
    sexo: string;
    dataNascimento: string;
    area: Area;
    profissao: Profissao;
    nivel: Niveis;
    satosfacao: number;
}

interface Contribuidores {
    area: string[],
    profissao: string[],
    numeroColaboradores: number[],
}