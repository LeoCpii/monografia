import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalGraficoPage } from './profissional-grafico.page';
import { ResultadoService } from './../../../shared/services/business-service/resultado.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable()
export class ProfissionalGraficoResolver implements Resolve<Promise<IProfissionalGraficoPage>> {
    constructor(
        private resultadoService: ResultadoService,
        private storage: StorageService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalGraficoPage> {

        const idResultado = this.storage.getJson('token-resultado');
        const resultado = await this.resultadoService.obterResultado(idResultado);

        const response: IProfissionalGraficoPage = {
            resultado: resultado.description,
        };

        return response;
    }
}
