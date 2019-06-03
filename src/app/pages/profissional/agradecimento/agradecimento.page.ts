import { Component, OnInit } from '@angular/core';
import { barChart } from './../../../shared/models/elements';
import { StorageService } from 'src/app/shared/services/storage.service';
import { RadialChartOptions } from 'chart.js';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

export interface IProfissionalAgradecimentoPage {
  resultado: any;
  profissao: any;
  profissaoResultado: any;
}

@Component({
  selector: 'agradecimento-page',
  templateUrl: './agradecimento.page.html',
  styleUrls: ['./agradecimento.page.css']
})

export class AgradecimentosPage implements OnInit {
  public data: IProfissionalAgradecimentoPage;

  constructor(
    private storage: StorageService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public pontosGrafico = this.storage.getJson('grafico');
  public profissaoUsuario = this.storage.getJson('dataProfissao');
  public resultado = this.storage.getJson('resultadoPerguntas');
  public pontuacaoProfissional: any;

  // public get porcentagemHomens() {
  //   const porcentagem = this.data.queryContribuidor.homens.porcentagem;
  //   return Math.floor(porcentagem);
  // }

  // public get porcentagemMulheres() {
  //   const porcentagem = this.data.queryContribuidor.mulheres.porcentagem;
  //   return Math.floor(porcentagem);
  // }

  // public get nota() {
  //   const nota = this.data.queryContribuidor.satisfacao;
  //   return Math.floor(nota);
  // }

  public radarChart: any = {
    labels: [''],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Pontuação da área'
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Sua pontuação'
      }
    ],
    colors: [{
      borderColor: 'rgb(255, 54, 54)',
      backgroundColor: 'rgba(255, 54, 54, 0.3)',
      pointBackgroundColor: 'rgba(255, 54, 54, 0.3)',
      pointBorderColor: 'rgb(255, 54, 54)',
    },
    {
      borderColor: 'rgb(75, 75, 75)',
      backgroundColor: 'rgba(75, 75, 75, 0.3)',
      pointBackgroundColor: 'rgba(75, 75, 75, 0.3)',
      pointBorderColor: 'rgb(75, 75, 75)',
    }]
  };

  public barChart: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Número de contribuições'
      },
    ],
    colors: [{
      backgroundColor: 'rgb(255, 54, 54)',
    }]
  };

  public radarChartOptions: RadialChartOptions = {
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
  public radarChartData = this.radarChart;

  public atualizaGraficoRadar() {
    this.radarChart.labels = this.data.resultado.description.caracteristicaGrafico;
    this.radarChart.datasets[1].data = this.data.resultado.description.valorGrafico; // Sua pontuação
    this.radarChart.datasets[0].data = this.data.profissaoResultado.description; // Pontuação da área
  }

  // public atualizaGraficoBarras() {
  //   this.barChart.labels = this.data.contribuidores.profissao;
  //   this.barChart.datasets[0].data = this.data.contribuidores.numeroColaboradores;
  //   /*TODO- Usado para ajustar a escala do grafico de barras*/
  //   this.barChart.datasets[0].data.push(0);
  // }

  private mediaPonderada(valorGrafico: number, valorResposta: number, valorPesoGrafico: number, ValorPesoResposta: number) {
    const resposta = (((valorGrafico * valorPesoGrafico) + (valorResposta * ValorPesoResposta)) / valorPesoGrafico + ValorPesoResposta);

    return resposta > 100 ? 100 : Math.trunc(resposta);
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.data = this.route.snapshot.data['data'];
      }
    });

    console.log(this.data);

    /*
    * Atualiza Graficos
    */
    this.atualizaGraficoRadar();
  }

  scroll(e: HTMLElement) {
    this.utils.scroll(e);
  }

}
