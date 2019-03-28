import { Component, OnInit } from '@angular/core';
import { FormatterService } from '../../../shared/services/formatter.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ValidatorService } from 'src/app/shared/services/validator.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import * as Moment from 'moment';

import { profissoes, niveis } from './../../../shared/models/elements';
import { ProfissionalService } from '../profissional.service';

export interface IProfissionalFormPage {
    niveis: Niveis[];
}

@Component({
    selector: 'profissional-form-page',
    templateUrl: './profissional-form.page.html',
    styleUrls: ['./profissional-form.page.css']
})

export class ProfissionalFormPage implements OnInit {
    public data: IProfissionalFormPage;

    constructor(
        private router: Router,
        private storage: StorageService,
        private route: ActivatedRoute,
    ) { }

    public feedback;
    public profissaoEscolhida = true;

    public profissoes: any;
    public niveis = niveis;

    public form = new FormGroup({
        nome: new FormControl(),
        sobrenome: new FormControl(),
        sexo: new FormControl(),
        dataNascimento: new FormControl(),
        area: new FormControl(),
        profissao: new FormControl(),
        nivel: new FormControl(),
    });

    ngOnInit() {
        this.data = this.route.snapshot.data['data'];
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.data = this.route.snapshot.data['data'];
            }
        });

        console.log(this.data);

        this.profissoes = profissoes;
    }

    public profissoesDeUmaArea() {

        const area = this.form.value.area;

        if (area) {
            this.profissaoEscolhida = false;
            return profissoes.profissao[area].areas;
        } else {
            return [];
        }
    }

    public validaIdade(c: FormControl) {
        const data = c.value.dataNascimento ? c.value.dataNascimento : '';
        const dataSemFormato = data.replace('/', '');
        const dtNascimento = Moment(dataSemFormato).toDate();
        const hoje = Moment().toDate();
        let status: boolean;

        const maiorQueHoje = (hoje <= dtNascimento);
        if (maiorQueHoje) {
            status = false;
        }

        return status ? null : { validarSenhas: { valid: false } };
    }

    ir() {
        this.router.navigate(['profissional', 'grafico']);
    }

    submit() {
        this.storage.setJson('dataProfissao', this.form.value);
        this.ir();
    }
}
