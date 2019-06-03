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
        email: string, profissaoId: string, nivelId: string, satisfacao: number
    }) {
        const url = `/profissional/register`;
        return this.ajax.post<ProfissionalResponse>(url, params);
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
