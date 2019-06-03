import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { RadialChartOptions } from 'chart.js';

import { StorageService } from 'src/app/shared/services/storage.service';
import { ResultadoService } from '../../../shared/services/business-service/resultado.service';
import { ProfissaoService } from '../../../shared/services/business-service/profissao.service';

export interface IProfissionalGraficoPage {
  resultado: any;
}

@Component({
  selector: 'profissional-grafico-page',
  templateUrl: './profissional-grafico.page.html',
})

export class ProfissionalGraficoPage implements OnInit {
  public data: IProfissionalGraficoPage;

  public deuErro: boolean;
  public mensagem: string;

  constructor(
    private router: Router,
    private storage: StorageService,
    private route: ActivatedRoute,
    private resultadoService: ResultadoService,
    private profissaoService: ProfissaoService
  ) {

  }

  public editChart: any;

  public barChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
      },
    }
  };

  public form = new FormGroup({
    caracteristica0: new FormControl(0),
    caracteristica1: new FormControl(0),
    caracteristica2: new FormControl(0),
    caracteristica3: new FormControl(0),
    caracteristica4: new FormControl(0),
    caracteristica5: new FormControl(0),
  });

  public montaNomeControl(posicao: number) {
    const nome = 'caracteristica' + String(posicao);
    return nome;
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.data = this.route.snapshot.data['data'];
      }
    });

    this.editChart = {
      labels: this.data.resultado.caracteristicaGrafico,
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0],
          label: 'Pontuação de personalidade',
        },
      ]
    };

    this.storage.remove('grafico');
    this.getDataGraph();
  }

  getDataGraph() {
    this.form.valueChanges.subscribe(response => {
      const data = [];

      data.push(
        Number(response.caracteristica0),
        Number(response.caracteristica1),
        Number(response.caracteristica2),
        Number(response.caracteristica3),
        Number(response.caracteristica4),
        Number(response.caracteristica5),
      );

      const clone = JSON.parse(JSON.stringify(this.editChart.datasets));

      clone[0].data = data;

      this.editChart.datasets = clone;
    });
  }

  private ir() {
    this.router.navigate(['profissional', 'agradecimentos']);
  }

  public async submit() {
    const relevanciasGrafico = [];
    const idResultado = this.storage.getJson('token-resultado');
    const idProfissao = this.storage.getJson('token-profissao');

    relevanciasGrafico.push(
      Number(this.form.value.caracteristica0),
      Number(this.form.value.caracteristica1),
      Number(this.form.value.caracteristica2),
      Number(this.form.value.caracteristica3),
      Number(this.form.value.caracteristica4),
      Number(this.form.value.caracteristica5),
    );

    const params = {
      idRelevancia: idResultado,
      grafico: relevanciasGrafico
    };

    let response;

    response = await this.resultadoService.atualizarValorSugerido(params);

    if (response.status === 200) {
        response = await this.resultadoService.atualizarMedia(idResultado);

      if (response.status === 200) {
        response = await this.profissaoService.atualizarProfissao(idProfissao, idResultado);

        if (response.status === 200) {
          this.router.navigate(['profissional', 'agradecimentos']);
        } else {
          this.deuErro = true;
          this.mensagem = 'Erro ao atualizar profissão';
        }
      } else {
        this.deuErro = true;
        this.mensagem = 'Erro ao atualizar media';
      }
    } else {
      this.deuErro = true;
      this.mensagem = 'Erro ao atualizar valor sugerido';
    }

    this.ir();
  }
}
