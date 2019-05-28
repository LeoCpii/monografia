import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProfissionalFormPage } from './profissional-form.page';
import { ProfissionalService } from './../../../shared/services/business-service/profissional.service';
import { AreaService } from './../../../shared/services/business-service/area.service';
import { ProfissaoService } from './../../../shared/services/business-service/profissao.service';
import { NiveisService } from './../../../shared/services/business-service/nivel.service';

@Injectable()
export class ProfissionalFormResolver implements Resolve<Promise<IProfissionalFormPage>> {
    private arrNiveis: Niveis[] = [];

    constructor(
        // private profissionalService: ProfissionalService,
        // private areaService: AreaService,
        private profissaoService: ProfissaoService,
        private niveisService: NiveisService,
        private route: ActivatedRoute) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<IProfissionalFormPage> {

        const niveis = await this.niveisService.obterNiveis();
        const profissoes = await this.profissaoService.obterProfissoes();
        
        this.arrNiveis.push(niveis.description.ESTAGIARIO);
        this.arrNiveis.push(niveis.description.TRAINEE);
        this.arrNiveis.push(niveis.description.JUNIOR);
        this.arrNiveis.push(niveis.description.PLENO);
        this.arrNiveis.push(niveis.description.SENIOR);

        // const area = await this.areaService.obterAreas();
        // const profissao = await this.profissaoService.obterProfissoes();

        const response: IProfissionalFormPage = {
            niveis: this.arrNiveis,
            // area: area,
            profissao: profissoes.description
        };

        return response;
    }
}
