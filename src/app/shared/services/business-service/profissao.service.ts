import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class ProfissaoService {
    constructor(private ajax: AjaxService) { }

    /*
    * Profissao
    */
    async obterProfissoes() {
        const url = `/profissao`;
        return this.ajax.get<ProfissaoResponse>(url);
    }

    async obterProfissao(id: string) {
        const url = `/profissao/${id}`;
        return this.ajax.get<Profissao>(url);
    }

    async queryContribuidor(id: string) {
        const url = `/query/dadosProfissao/${id}`;
        return this.ajax.get<QueryContribuidor>(url);
    }

    async atualizarProfissao(idProfissao: string, idResultado: string) {
        const url = `/profissao/${idProfissao}/${idResultado}`;
        return this.ajax.put<any>(url);
    }

    async obterProfissaoResultado(idProfissao: string, idResultado: string) {
        const url = `/profissao/relacionaProfissaoResultado/${idProfissao}/${idResultado}`;
        return this.ajax.get<Profissao>(url);
    }
}
