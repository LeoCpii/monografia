import { Injectable } from '@angular/core';
import { AjaxService } from '../../shared/services/ajax.service';

@Injectable()
export class ProfissionalService {
    constructor(private ajax: AjaxService) { }

    async obterNiveis() {
        const url = `/niveis`;
        return this.ajax.get<Niveis[]>(url);
    }

    async obterAreas() {
        const url = `/area`;
        return this.ajax.get<Area[]>(url);
    }

    async obterProfissoes() {
        const url = `/profissao`;
        return this.ajax.get<Profissao[]>(url);
    }
}
