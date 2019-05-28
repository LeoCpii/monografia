import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class AreaService {
    constructor(private ajax: AjaxService) { }

    /*
    * Area
    */
    async obterAreas() {
        const url = `/area`;
        // return this.ajax.get<Area[]>(url);
    }

    async obterArea(id: string) {
        const url = `/area/${id}`;
        // return this.ajax.get<Area>(url);
    }
}
