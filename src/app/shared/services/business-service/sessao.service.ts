import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class SessaoService {
    constructor(private ajax: AjaxService) { }

    /*
    * Sessao
    */
    async criarSessao(idProfissional: string) {
        const url = `/sessao/register/${idProfissional}`;
        return this.ajax.post<SessaoResponse>(url);
    }

    async atualizarSessao(idSessao: string, status: number) {
        const url = `/sessao/atualizar/status/${idSessao}/${status}`;
        return this.ajax.put<SessaoResponse>(url);
    }

    async obterSessao(idSessao: string) {
        const url = `/sessao/${idSessao}`;
        return this.ajax.get<SessaoResponse>(url);
    }

    async obterSessaoPorEmail(params: { email: string }) {
        const url = `/sessao/obter/email`;
        return this.ajax.post<any>(url, params);
    }

    async atualizarSessaoResultado(params: { idSessao: string, idResultado: string, idProfissao: string }) {
        const url = '/sessao/atualizar/resultado';
        return this.ajax.put<any>(url, params);
    }
}

