import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IResultado } from './resultado.page';
import { ProfissaoService } from 'src/app/shared/services/business-service/profissao.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable()
export class ResultadoResolver implements Resolve<Promise<IResultado>> {
    constructor(
        private route: ActivatedRoute,
        private profissaoService: ProfissaoService,
        private storageService: StorageService
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IResultado> {

        const idProfissao = '5cfd4cac28e90b3bb8b3bea5';
        const profissao = await this.profissaoService.obterProfissao(idProfissao);

        const response: IResultado = {
            profissao: profissao,
        };

        return response;
    }
}
