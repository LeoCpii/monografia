import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Injectable()
export class NiveisService {
    constructor(private ajax: AjaxService) { }

    /*
    * Niveis
    */
    async obterNiveis() {
        const url = `/niveis`;
        return this.ajax.get<NiveisResponse>(url);
    }
}
