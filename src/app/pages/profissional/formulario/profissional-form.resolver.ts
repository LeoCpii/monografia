import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalFormPage } from './profissional-form.page';
import { ProfissionalService } from '../profissional.service';

@Injectable()
export class ProfissionalFormResolver implements Resolve<Promise<IProfissionalFormPage>> {
    constructor(private profissionalService: ProfissionalService, private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalFormPage> {

        const niveis = await this.profissionalService.obterNiveis();
        const area = await this.profissionalService.obterAreas();
        const profissao = await this.profissionalService.obterProfissoes();

        const response: IProfissionalFormPage = {
            niveis: niveis,
            area: area,
            profissao: profissao
        };

        return response;
    }
}
