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

interface Formlog {
    value: string;
    valid: boolean;
}

interface NiveisResponse {
    status: number
    message: string;
    description: NiveisService;
}

interface NiveisService {
    ESTAGIARIO: Niveis,
    TRAINEE: Niveis,
    JUNIOR: Niveis,
    PLENO: Niveis,
    SENIOR: Niveis,
}

interface Niveis {
    nome: string;
    relevancia: number;
}


interface ProfissaoResponse {
    status: number
    message: string;
    description: Profissao[];
}

interface Profissao {
    _id: string;
    nome: string;
    pontos: number[];
    descricao: Descricao;
    salarios: Salario;
    videos: Video[];
}

interface Profissional {
    nome: string;
    sobrenome: string;
    sexo: string;
    email: string;
    dataNascimento: string;
    profissao: Profissao;
    nivel: Niveis;
    satisfacao: number;
}

interface Descricao {
    oQueFaz: string;
    oQueEh:string;
}

interface Salario {
    profissao?: Profissao;
    estagiario: string;
    trainee: string;
    junior: string;
    pleno: string;
    senior: string;
}

interface Video {
    url: string;
}


interface Contribuidores {
    area: string[],
    profissao: string[],
    numeroColaboradores: number[],
}

interface ContribuidoresSexo {
    homens: {
        quantidade: number,
        porcentagem: number
    },
    mulheres: {
        quantidade: number,
        porcentagem: number
    },
}

interface QueryContribuidor {
    nome: string,
    total: number,
    satisfacao: number,
    homens: {
        quantidade: number,
        porcentagem: number
    },
    mulheres: {
        quantidade: number,
        porcentagem: number
    },
    pontos: number[],
}