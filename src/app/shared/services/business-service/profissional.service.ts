import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class ProfissionalService {
    constructor(private ajax: AjaxService) { }
    /*
    * Profissional
    */
    async cadastrarProfissional(params: {
        nome: string, sobrenome: string, sexo: string, dataNascimento: string,
        areaId: string, profissaoId: string, nivelId: string
    }) {
        const url = `/profissional/register`;
        return this.ajax.post<any>(url, params);
    }

    async obterProfissionais() {
        const url = `/profissional`;
        return this.ajax.get<Profissional>(url);
    }

    async obterProfissional(id: string) {
        const url = `/profissional/${id}`;
        return this.ajax.get<Profissional>(url);
    }
}
