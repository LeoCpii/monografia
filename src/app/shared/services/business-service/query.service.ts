import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class QueryService {
    constructor(private ajax: AjaxService) { }

    /*
    * Querys
    */

    async obterContribuidores() {
        const url = `/query/contribuidores`;
        return this.ajax.get<Contribuidores>(url);
    }

    async obterSexoContribuidor() {
        const url = `/query/contribuidoresSexo`;
        return this.ajax.get<ContribuidoresSexo>(url);
    }

    async queryContribuidor(id: string) {
        const url = `/query/dadosProfissao/${id}`;
        return this.ajax.get<QueryContribuidor>(url);
    }
}
