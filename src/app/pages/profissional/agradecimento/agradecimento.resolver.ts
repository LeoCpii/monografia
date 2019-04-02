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
        const area = await this.profissionalService.obterArea(profissionalData.area._id);
        const profissionais = await this.profissionalService.obterProfissionais();
        const profissao = await this.profissionalService.obterProfissao(profissionalData.profissao._id);
        const contribuidores = await this.profissionalService.obterContribuidores();

        const response: IProfissionalAgradecimentoPage = {
            nivel: nivel,
            profissao: profissao,
            area: area,
            profissionais: profissionais,
            contribuidores: contribuidores,
        };

        return response;
    }
}
