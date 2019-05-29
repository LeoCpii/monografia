import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IPerguntasPage } from './perguntas.page';
import { PerguntasService } from 'src/app/shared/services/business-service/perguntas.service';

@Injectable()
export class PerguntasResolver implements Resolve<Promise<IPerguntasPage>> {
    constructor(
        private perguntasService: PerguntasService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IPerguntasPage> {

        const totalPerguntas = await this.perguntasService.obterTotalPerguntas();

        const response: IPerguntasPage = {
            totalPerguntas: totalPerguntas.description,
        };

        return response;
    }
}
