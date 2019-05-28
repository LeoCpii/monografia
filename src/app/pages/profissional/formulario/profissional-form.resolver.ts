import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalFormPage } from './profissional-form.page';
import { ProfissionalService } from './../../../shared/services/business-service/profissional.service';
import { AreaService } from './../../../shared/services/business-service/area.service';
import { ProfissaoService } from './../../../shared/services/business-service/profissao.service';
import { NiveisService } from './../../../shared/services/business-service/nivel.service';

@Injectable()
export class ProfissionalFormResolver implements Resolve<Promise<IProfissionalFormPage>> {
    constructor(
        // private profissionalService: ProfissionalService,
        // private areaService: AreaService,
        // private profissaoService: ProfissaoService,
        private niveisService: NiveisService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalFormPage> {

        const niveis = await this.niveisService.obterNiveis();
        // const area = await this.areaService.obterAreas();
        // const profissao = await this.profissaoService.obterProfissoes();

        const response: IProfissionalFormPage = {
            niveis: niveis,
            // area: area,
            // profissao: profissao
        };

        return response;
    }
}
