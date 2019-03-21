import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FormGroup, FormControl } from '@angular/forms';
import { perguntas } from './../../shared/models/elements';

@Component({
    selector: 'perguntas-page',
    templateUrl: './perguntas.page.html',
    styleUrls: ['./perguntas.page.css']
})

export class PerguntasPage implements OnInit {

    constructor(private utils: UtilsService) { }

    public cor: string;
    public contador = 1;
    public perguntas = perguntas;
    public numero: number;
    public perguntasJaRespondidas = [];

    public form = new FormGroup({
        letraA: new FormControl(''),
        letraB: new FormControl(''),
        letraC: new FormControl(''),
    });

    public submitButtonIsLoading = false;

    recuperaCor() {
        const corAtual = this.cor;
        while (corAtual === this.cor) {
            this.cor = this.utils.corAleatoria();
        }
    }

    responder() {
        this.contador++;

        const corAtual = this.cor;
        while (corAtual === this.cor) {
            this.cor = this.utils.corAleatoria();
        }

        this.selecionaPergunta();
    }

    selecionaPergunta() {
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

    ngOnInit() {
        this.recuperaCor();
        this.selecionaPergunta();
    }
}
