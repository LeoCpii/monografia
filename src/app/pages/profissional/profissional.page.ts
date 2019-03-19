import { Component, OnInit } from '@angular/core';
import { FormatterService } from './../../shared/services/formatter.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
    selector: 'profissional-page',
    templateUrl: './profissional.page.html',
    styleUrls: ['./profissional.page.css']
})

export class ProfissionalPage implements OnInit {

    constructor(
        private fb: FormBuilder,
        private validator: ValidatorService
    ) { }

    public form = new FormGroup({});

    public feedback = false;

    public profissao = {
        data: [
            { label: 'Desenvolvedor', value: '1' },
            { label: 'Analista', value: '2' },
            { label: 'Gerente', value: '3' },
            { label: 'Diretor', value: '4' },
        ],
    };

    ngOnInit() {
        this.form = this.fb.group({
            nome: this.fb.control(''),
            sobrenome: this.fb.control(''),
            sexo: this.fb.control(''),
            dataNascimento: this.fb.control('', Validators.compose([this.validaIdade])),
            profissao: this.fb.control(''),
            tempo: this.fb.control(''),
        }, {
             validators: this.validaIdade 
        });
    }

    public validaIdade(c: FormControl) {
        return true ? null : { validarSenhas: { valid: false } };
    }

    submit() {
        console.log(this.form.value);
    }
}
