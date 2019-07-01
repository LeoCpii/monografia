import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { SessaoService } from '../business-service/sessao.service';

@Injectable()
export class AuthService {

    constructor(
        private sessaoService: SessaoService,
        private storageService: StorageService,
        private router: Router
    ) { }

    async ehAutenticado() {
        const idSessao = this.storageService.getJson('token-sessao');
        let sessao: any;

        if (idSessao) {
            sessao = await this.sessaoService.obterSessao(idSessao);
            return sessao;
        }

        return false;
    }

    public rotaDestino(url: string) {
        const destino = {
            rota: [],
            status: 0
        };

        if (url.indexOf('profissional') > -1) {
            if (url.indexOf('perguntas') > -1) {
                destino.status = 1;
                destino.rota = ['/perguntas', 'profissional'];
                return destino;
            } else if (url.indexOf('grafico') > -1) {
                destino.status = 2;
                destino.rota = ['/profissional', 'grafico'];
                return destino;
            } else if (url.indexOf('agradecimentos') > -1) {
                destino.status = 3;
                destino.rota = ['/profissional', 'agradecimentos'];
                return destino;
            }
        } else if (url.indexOf('estudante') > -1) {
            return destino;
        } else {
            return destino;
        }
    }

    public obterRota(status: number) {
        const url = this.router.url;

        let rota = [];

        if (url.indexOf('profissional') > -1) {
            if (status === 1) {
                rota = ['/perguntas', 'profissional'];
            } else if (status === 2) {
                rota = ['/profissional', 'grafico'];
            } else if (status === 3) {
                rota = ['/profissional', 'agradecimentos'];
            } else {
                return [];
            }
        } else {
            if (status === 1) {
                rota = ['/perguntas', 'profissional'];
            } else if (status === 2) {
                rota = ['/perguntas', 'profissional'];
            } else if (status === 3) {
                rota = ['/profissional', 'agradecimentos'];
            } else {
                return [];
            }
        }

        return rota;
    }

    public origem(url: string) {
        let origem;

        if (url.indexOf('profissional') > -1) {
            origem = 'profissional';
        } else if (url.indexOf('estudante') > -1) {
            origem = 'estudante';
        }
        return origem;
    }

    public async redirecionar() {
        const idSessao = this.storageService.getJson('token-sessao');
        const sessao = await this.sessaoService.obterSessao(idSessao);

        const rota = this.obterRota(sessao.description.status);

        this.router.navigate(rota);
    }
}
