import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerguntasService } from '../../shared/services/business-service/perguntas.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

export interface IPerguntasPage {
    totalPerguntas: number;
}

@Component({
    selector: 'perguntas-page',
    templateUrl: './perguntas.page.html',
    styleUrls: ['./perguntas.page.css']
})

export class PerguntasPage implements OnInit {
    public data: IPerguntasPage;

    public pergunta: Pergunta;
    public resultado: Resultado[] = [];
    public response: PerguntaResponse;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private utils: UtilsService,
        private location: Location,
        private perguntasService: PerguntasService
    ) { }

    public cor: string;
    public contador = 0;
    public perguntasRespondidasArr = [];
    public numeroDePerguntasSessao = 4;
    public deuErrado = false;

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
        this.resultado.push({
            idPergunta: this.pergunta._id,
            idResposta: this.form.value.resposta
        });

        this.form.get('resposta').reset();

        this.selecionaPergunta();
    }

    public async selecionaPergunta() {

        if (this.perguntasRespondidasArr.length === this.numeroDePerguntasSessao) {
            console.log(this.resultado);
            this.finalizarPerguntas();
            return;
        } else {
            this.recuperaCor();
            let posicao = this.utils.numeroAleatorio(0, this.data.totalPerguntas);

            while (this.perguntasRespondidasArr.indexOf(posicao) !== -1) {
                posicao = this.utils.numeroAleatorio(0, this.data.totalPerguntas);
            }

            this.perguntasRespondidasArr.push(posicao);

            this.response = await this.perguntasService.obterPerguntasPosicao(posicao);

            if (this.response.status === 200) {
                this.contador++;
                this.pergunta = this.response.description;
            } else {
                this.deuErrado = true;
            }
        }
    }

    finalizarPerguntas() {
        const url = this.router.url;

        if (url.indexOf('profissional') > -1) {
            this.router.navigate(['profissional', 'agradecimentos']);
        } else {
            const profissao = this.utils.calculaProfissao();

            this.router.navigate(['estudante', 'resultado']);
        }
    }

    voltar() {
        this.location.back();
    }

    ngOnInit() {
        this.data = this.route.snapshot.data['data'];
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.data = this.route.snapshot.data['data'];
            }
        });

        this.recuperaCor();
        this.selecionaPergunta();
    }
}
