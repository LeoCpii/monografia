import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { perguntas } from './../../shared/models/elements';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
    selector: 'perguntas-page',
    templateUrl: './perguntas.page.html',
    styleUrls: ['./perguntas.page.css']
})

export class PerguntasPage implements OnInit {

    constructor(
        private utils: UtilsService,
        private storage: StorageService
    ) { }

    public cor: string;
    public contador = 1;
    public perguntas = perguntas;
    public numero: number;
    public perguntasJaRespondidas = [];

    public form = new FormGroup({
        resposta: new FormControl('', Validators.required),
    });

    public submitButtonIsLoading = false;

    private recuperaCor() {
        const corAtual = this.cor;
        while (corAtual === this.cor) {
            this.cor = this.utils.corAleatoria();
        }
    }

    private responder() {
        this.contador++;

        const corAtual = this.cor;
        while (corAtual === this.cor) {
            this.cor = this.utils.corAleatoria();
        }

        this.salvaResposta();

        this.selecionaPergunta();

        this.form.get('resposta').reset();
    }

    private selecionaPergunta() {
        let perguntaNova = false;

        while (!perguntaNova) {
            const pergunta = this.utils.numeroAleatorio(0, this.perguntas.length);

            if (this.perguntasJaRespondidas.length === this.perguntas.length) {
                return;
            }
            if (this.perguntasJaRespondidas.length > 0) {
                if (this.perguntasJaRespondidas.indexOf(pergunta) === -1) {
                    perguntaNova = true;
                }
            } else {
                perguntaNova = true;
            }

            if (perguntaNova) {
                this.perguntasJaRespondidas.push(pergunta);
                this.numero = pergunta;
            }
        }
    }

    private salvaResposta() {
        const respostas = this.form.value.resposta;
        const arr = respostas.split(',').map(response => {
            return parseInt(response, 10);
        });

        this.incrementaResposta(arr);
    }

    private incrementaResposta(value: any): void {
        console.log(value)
        const respostas = this.storage.getJson('resultado');

        if (!respostas) {
            this.storage.setJson('resultado', value);
            return;
        }

        respostas.map((response, index) => {
            response += value[index];
            console.log(response);
        });

        console.log(respostas);

        // this.storage.set('resultado', value);
    }

    ngOnInit() {
        this.recuperaCor();
        this.selecionaPergunta();
    }
}
