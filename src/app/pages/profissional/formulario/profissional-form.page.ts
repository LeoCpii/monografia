import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ValidatorService } from 'src/app/shared/services/validator.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { ProfissionalService } from '../../../shared/services/business-service/profissional.service';

export interface IProfissionalFormPage {
    niveis: Niveis[];
    profissao: Profissao[];
}

@Component({
    selector: 'profissional-form-page',
    templateUrl: './profissional-form.page.html',
    styleUrls: ['./profissional-form.page.css']
})

export class ProfissionalFormPage implements OnInit {
    public data: IProfissionalFormPage;
    public response: ProfissionalResponse;
    public deuErro = false;

    @ViewChild('arrStar') starHtml: ElementRef<HTMLDivElement>;

    constructor(
        private router: Router,
        private storage: StorageService,
        private route: ActivatedRoute,
        private profissionalService: ProfissionalService,
    ) { }
    public isLoading = false;

    public form = new FormGroup({
        nome: new FormControl(),
        sobrenome: new FormControl(),
        sexo: new FormControl(),
        email: new FormControl(),
        dataNascimento: new FormControl(),
        profissao: new FormControl(),
        nivel: new FormControl(),
        satisfacao: new FormControl(0),
    }, {
            validators: this.validaFormulario
        }
    );

    private validaFormulario(c: FormControl) {
        let status = false;

        const notaVazia: boolean = (c.value.satisfacao !== 0 && c.value.satisfacao !== null && c.value.satisfacao !== undefined);
        const sexoVazio: boolean = (c.value.sexo);

        /*
        * Valida idade
        */
        // const idadeValida: boolean;

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

        this.valorNota();
    }

    public ir() {
        this.router.navigate(['profissional', 'grafico']);
    }

    private valorNota() {
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

    public async cadastrarProfissional() {
        this.isLoading = true;

        const params = {
            nome: this.form.value.nome,
            sobrenome: this.form.value.sobrenome,
            sexo: this.form.value.sexo,
            email: this.form.value.email,
            dataNascimento: this.form.value.dataNascimento,
            profissaoId: this.form.value.profissao,
            nivelId: this.form.value.nivel,
            satisfacao: this.form.value.satisfacao,
        };

        this.response = await this.profissionalService.cadastrarProfissional(params);

        if (this.response.status === 200) {
            this.storage.clear();
            this.storage.setJson('token-profissional', this.response.description._id);
            this.storage.setJson('token-profissao', this.form.value.profissao);
            this.router.navigate(['perguntas', 'profissional']);
        } else {
            this.deuErro = true;
            this.isLoading = false;
        }
    }

}
