import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class PerguntasService {
    constructor(private ajax: AjaxService) { }
    /*
    * Perguntas
    */
    async obterPerguntasPosicao(position: number) {
        const url = `/pergunta/position/${position}`;
        return this.ajax.get<PerguntaResponse>(url);
    }

    async obterTotalPerguntas() {
        const url = `/pergunta/query/totalDePerguntas`;
        return this.ajax.get<TotalPerguntasResponse>(url);
    }
}
