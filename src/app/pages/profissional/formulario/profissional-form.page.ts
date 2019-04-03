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
    area: Area[];
    profissao: Profissao[];
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
        private profissionalService: ProfissionalService,
    ) { }

    public feedback = false;
    public mensagemFeedback = '';
    public profissaoEscolhida = true;

    public profissoes: any;
    public niveis = niveis;

    public isLoading = false;
    public response: any = '';

    public form = new FormGroup({
        nome: new FormControl(),
        sobrenome: new FormControl(),
        sexo: new FormControl(),
        dataNascimento: new FormControl(),
        area: new FormControl(),
        profissao: new FormControl(),
        nivel: new FormControl(),
        nota: new FormControl(),
    });

    ngOnInit() {
        this.data = this.route.snapshot.data['data'];
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.data = this.route.snapshot.data['data'];
            }
        });

        this.profissoes = profissoes;
    }

    public profissoesDeUmaArea() {
        const idArea = this.form.value.area;

        if (idArea) {
            this.profissaoEscolhida = false;

            const result = [];

            this.data.profissao['profissao'].forEach(element => {
                if (element['area'] === idArea) {
                    result.push(element);
                }
            });

            return result;
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

    private async cadastraProfissional() {
        this.isLoading = false;

        const params = {
            nome: this.form.value.nome,
            sobrenome: this.form.value.sobrenome,
            sexo: this.form.value.sexo,
            dataNascimento: this.form.value.dataNascimento,
            areaId: this.form.value.area,
            profissaoId: this.form.value.profissao,
            nivelId: this.form.value.nivel,
        };

        this.response = await this.profissionalService.cadastrarProfissional(params);

        this.isLoading = false;

        if (this.response['response'].statusHttp === 200) {
            this.storage.setJson('profissional', this.response['response'].objeto);
            this.storage.setJson('dataProfissao', this.form.value);
            this.ir();
        } else {
            this.feedback = true;
            this.mensagemFeedback = this.response.body;
        }
    }

    ir() {
        this.router.navigate(['profissional', 'grafico']);
    }

    public selecionaNota(e): void {
        e.preventDefault();
        const nota = e.target.getAttribute('data-nota');

        this.colorirEstrelas(nota);
    }

    public colorirEstrelas(nota: number) {
        
    }
}
