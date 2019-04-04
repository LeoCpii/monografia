import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalAgradecimentoPage } from './agradecimento.page';
import { ProfissionalService } from '../profissional.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable()
export class ProfissionalAgradecimentoResolver implements Resolve<Promise<IProfissionalAgradecimentoPage>> {
    constructor(private profissionalService: ProfissionalService, private route: ActivatedRoute, private storageService: StorageService) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalAgradecimentoPage> {

        const profissionalData = this.storageService.getJson('profissional');
        const nivel = profissionalData.nivel;
        const contribuidores = await this.profissionalService.obterContribuidores();
        const sexoContribuidor = await this.profissionalService.obterSexoContribuidor();
        const queryContribuidor = await this.profissionalService.queryContribuidor(profissionalData.profissao._id);

        const response: IProfissionalAgradecimentoPage = {
            nivel: nivel,
            contribuidores: contribuidores,
            sexoContribuidor: sexoContribuidor,
            queryContribuidor: queryContribuidor
        };

        return response;
    }
}
