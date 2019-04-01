import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { perguntas } from './../../shared/models/elements';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'perguntas-page',
    templateUrl: './perguntas.page.html',
    styleUrls: ['./perguntas.page.css']
})

export class PerguntasPage implements OnInit {

    constructor(
        private utils: UtilsService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public cor: string;
    public contador = 1;
    public perguntas = perguntas;
    public random: number;
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

    public responder() {
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

        if (this.perguntasJaRespondidas.length === this.perguntas.length) {
            this.finalizarPerguntas();
            return;
        }

        while (!perguntaNova) {
            const pergunta = this.utils.numeroAleatorio(0, this.perguntas.length);

            if (this.perguntasJaRespondidas.length > 0) {
                if (this.perguntasJaRespondidas.indexOf(pergunta) === -1) {
                    perguntaNova = true;
                }
            } else {
                perguntaNova = true;
            }

            if (perguntaNova) {
                this.perguntasJaRespondidas.push(pergunta);
                this.random = pergunta;
            }
        }
    }

    private salvaResposta() {
        const respostas = this.form.value.resposta;
        const numerPergunta = this.random;
        const arr = respostas.split(',').map(response => {
            return parseInt(response, 10);
        });

        this.incrementaResposta(numerPergunta, arr);
    }

    private incrementaResposta(pergunta: number, value: any): void {
        const respostas = this.storage.getJson('resultadoPerguntas');
        const pontuacaoPorPergunta = this.storage.getJson('pontuacaoPorPergunta');

        const arr = [];

        if (!respostas) {
            this.storage.setJson('resultadoPerguntas', value);
            this.storage.setJson('pontuacaoPorPergunta', [{
                pergunta: pergunta,
                reposta: value
            }]);

            return;
        }

        /*
        * Agrega resposta atual com as anteriores
        */
        pontuacaoPorPergunta.push({
            pergunta: pergunta,
            reposta: value
        });
        /*
        * Soma resposta atual com as anteriores
        */
        respostas.map((response, index) => {
            response += value[index];
            arr.push(response);
        });

        this.storage.setJson('pontuacaoPorPergunta', pontuacaoPorPergunta);
        this.storage.setJson('resultadoPerguntas', arr);
    }

    limpaLocalStorage() {
        this.storage.remove('resultadoPerguntas');
        this.storage.remove('pontuacaoPorPergunta');
    }

    finalizarPerguntas() {
        const url = this.router.url;

        if (url.indexOf('profissional') > -1) {
            // const currentUser = this.storage.getJson('profissional');

            this.router.navigate(['profissional', 'agradecimentos']);
        } else {
            this.router.navigate(['estudante', 'resultado']);
        }
    }

    ngOnInit() {
        this.limpaLocalStorage();
        this.recuperaCor();
        this.selecionaPergunta();
    }
}
