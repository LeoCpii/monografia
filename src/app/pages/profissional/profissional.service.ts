import { Injectable } from '@angular/core';
import { AjaxService } from '../../shared/services/ajax.service';

@Injectable()
export class ProfissionalService {
    constructor(private ajax: AjaxService) { }

    async obterNiveis() {
        const url = `/niveis`;
        return this.ajax.get<Niveis[]>(url);
    }

    /*
    * Area
    */
    async obterAreas() {
        const url = `/area`;
        return this.ajax.get<Area[]>(url);
    }

    async obterArea(id: string) {
        const url = `/area/${id}`;
        return this.ajax.get<Area>(url);
    }

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
}
