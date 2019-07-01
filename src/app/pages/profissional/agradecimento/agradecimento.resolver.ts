import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalAgradecimentoPage } from './agradecimento.page';
import { ResultadoService } from 'src/app/shared/services/business-service/resultado.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ProfissaoService } from 'src/app/shared/services/business-service/profissao.service';

@Injectable()
export class ProfissionalAgradecimentoResolver implements Resolve<Promise<IProfissionalAgradecimentoPage>> {
    constructor(
        // private profissionalService: ProfissionalService,
        // private queryService: QueryService,
        private storage: StorageService,
        private resultadoService: ResultadoService,
        private profissaoService: ProfissaoService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalAgradecimentoPage> {

        const idResultado = this.storage.getJson('token-resultado');
        const idProfissao = this.storage.getJson('token-profissao');

        const resultado = await this.resultadoService.obterResultado(idResultado);
        const profissao = await this.profissaoService.obterProfissao(idProfissao);
        const profissaoResultado = await this.profissaoService.obterProfissaoResultado(idProfissao, idResultado);

        const response: IProfissionalAgradecimentoPage = {
            resultado: resultado,
            profissao: profissao,
            profissaoResultado: profissaoResultado,
        };

        return response;
    }
}
