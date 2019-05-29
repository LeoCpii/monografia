import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalAgradecimentoPage } from './agradecimento.page';
// import { ProfissionalService } from './../../../shared/services/business-service/profissional.service';
// import { QueryService } from './../../../shared/services/business-service/query.service';
// import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable()
export class ProfissionalAgradecimentoResolver implements Resolve<Promise<IProfissionalAgradecimentoPage>> {
    constructor(
        // private profissionalService: ProfissionalService,
        // private queryService: QueryService,
        // private storageService: StorageService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalAgradecimentoPage> {

        // const profissionalData = this.storageService.getJson('profissional');
        // const nivel = profissionalData.nivel;
        // const contribuidores = await this.queryService.obterContribuidores();
        // const sexoContribuidor = await this.queryService.obterSexoContribuidor();
        // const queryContribuidor = await this.queryService.queryContribuidor(profissionalData.profissao._id);

        const response: IProfissionalAgradecimentoPage = {
            // nivel: nivel,
            // contribuidores: contribuidores,
            // sexoContribuidor: sexoContribuidor,
            // queryContribuidor: queryContribuidor
        };

        return response;
    }
}
