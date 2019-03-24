import { Component, OnInit } from '@angular/core';
import { FormatterService } from '../../../shared/services/formatter.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import * as Moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'profissional-form-page',
    templateUrl: './profissional-form.page.html',
    styleUrls: ['./profissional-form.page.css']
})

export class ProfissionalFormPage implements OnInit {

    constructor(
        private fb: FormBuilder,
        private validator: ValidatorService,
        private location: Location,
        private router: Router
    ) { }

    public feedback;

    public form = new FormGroup({
        nome: new FormControl(),
        sobrenome: new FormControl(),
        sexo: new FormControl(),
        dataNascimento: new FormControl(),
        profissao: new FormControl(),
        tempo: new FormControl(),
    },
    // {
    //     validators: this.validaIdade
    // }
    );

    public profissao = {
        data: [
            { label: 'Desenvolvedor', value: '1' },
            { label: 'Analista', value: '2' },
            { label: 'Gerente', value: '3' },
            { label: 'Diretor', value: '4' },
        ],
    };

    ngOnInit() {
        // this.form = this.fb.group({
        //     nome: this.fb.control(''),
        //     sobrenome: this.fb.control(''),
        //     sexo: this.fb.control(''),
        //     dataNascimento: this.fb.control('', Validators.compose([this.validaIdade])),
        //     profissao: this.fb.control(''),
        //     tempo: this.fb.control(''),
        // }, {
        //      validators: this.validaIdade
        // });
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
        this.router.navigate(['profissional','grafico']);
    }

    submit() {
        console.log(this.form.value);
        this.ir();
    }
}
