import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class ResultadoService {
    constructor(private ajax: AjaxService) { }

    /*
    * Resultado
    */
    async registrarResultado(params: {
        idProfissional: string,
        resultado: PerguntaResposta[]
    }) {

        const url = `/resultado/register`;
        return this.ajax.post<any>(url, params);
    }

    /*
    * Obtem relevancia
    */
    async obterResultado(idRelevancia: string) {
        const url = `/resultado/relevancia/${idRelevancia}`;
        return this.ajax.get<any>(url);
    }

    /*
    * Atualizar relevancia
    */
    async atualizarValorSugerido(params: { idRelevancia: string, grafico: number[] }) {
        const url = `/resultado/atualizarValorSugeridoDoResultado`;
        return this.ajax.put<any>(url, params);
    }

    /*
    * Atualizar media
    */
    async atualizarMedia(idResultado: string) {
        const url = `/resultado/atualizarMediaResultado/${idResultado}`;
        return this.ajax.put<any>(url);
    }
}
