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
        return this.ajax.get<Profissao[]>(url);
    }

    async obterProfissao(id: string) {
        const url = `/profissao/${id}`;
        return this.ajax.get<Profissao>(url);
    }

    async queryContribuidor(id: string) {
        const url = `/query/dadosProfissao/${id}`;
        return this.ajax.get<QueryContribuidor>(url);
    }
}
