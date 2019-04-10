import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormatterService } from '../../../shared/services/formatter.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ValidatorService } from 'src/app/shared/services/validator.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import * as Moment from 'moment';

import { profissoes, niveis } from './../../../shared/models/elements';
import { ProfissionalService } from '../../../shared/services/business-service/profissional.service';

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

    @ViewChild('arrStar') starHtml: ElementRef<HTMLDivElement>;

    constructor(
        private validatorService: ValidatorService,
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
        satisfacao: new FormControl(0),
    }, {
            validators: this.validaFormulario
        }
    );

    private validaFormulario(c: FormControl) {
        let status = false;

        const notaVazia: boolean = (c.value.nota !== 0);
        const sexoVazio: boolean = (c.value.sexo);

        /*
        * Valida idade
        */
        // const idadeValida: boolean;

        const data = c.value.dataNascimento ? c.value.dataNascimento : '';
        const dataSemFormato = new RegExp(data, 'g');
        // const dtNascimento = Moment(dataSemFormato).toDate();
        // const hoje = Moment().toDate();

        // const maiorQueHoje = (hoje <= dtNascimento);

        console.log(dataSemFormato);

        status = notaVazia && sexoVazio;

        return status ? null : { validaFormulario: { valid: false } };
    }

    ngOnInit() {
        this.data = this.route.snapshot.data['data'];
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.data = this.route.snapshot.data['data'];
            }
        });

        this.profissoes = profissoes;
        this.valorNota();
    }

    public profissoesDeUmaArea() {
        const idArea = this.form.value.area;

        if (idArea) {
            this.profissaoEscolhida = false;

            const result = [];

            this.data.profissao.forEach(element => {
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
            satisfacao: this.form.value.satisfacao,
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

    valorNota() {
        this.form.valueChanges.subscribe(element => {
            const nota = element.satisfacao;

            const partentComponent = this.starHtml.nativeElement;
            const componentHtml = partentComponent.childNodes;
            let contador = 0;

            componentHtml.forEach(elementComponent => {
                const star = partentComponent.children[contador].children[0].children[1].children[0];
                if (contador < nota) {
                    star.classList.add('star-active', 'fa-star');
                    star.classList.remove('fa-star-o');
                } else {
                    star.classList.remove('star-active');
                    star.classList.add('fa-star-o');
                }

                contador++;
            });
        });
    }

}
