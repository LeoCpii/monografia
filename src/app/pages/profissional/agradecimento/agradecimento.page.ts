import { Component, OnInit } from '@angular/core';
import { barChart } from './../../../shared/models/elements';
import { StorageService } from 'src/app/shared/services/storage.service';
import { profissoes } from "./../../../shared/models/elements";
import { RadialChartOptions } from 'chart.js';

@Component({
  selector: 'agradecimento-page',
  templateUrl: './agradecimento.page.html',
  styleUrls: ['./agradecimento.page.css']
})

export class AgradecimentosPage implements OnInit {

  constructor(private storage: StorageService) { }

  public pontosGrafico = this.storage.getJson('grafico');
  public profissaoUsuario = this.storage.getJson('dataProfissao');
  public resultado = this.storage.getJson('resultadoPerguntas');
  public anosTrabalhados = this.profissaoUsuario.tempo;
  public profissao = profissoes.profissao[this.profissaoUsuario.area].areas[this.profissaoUsuario.profissao];
  public pontuacaoProfissional: any;

  public radarChart: any = {
    labels: ['Comunicatividade', 'Organizacao', 'Criatividade', 'Detalhismo', 'Lideranca', 'Proatividade'],
    datasets: [
      {
        data: this.profissao.pontos,
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

  public radarChartData = this.radarChart;
  public barChartData = barChart;

  public retornaPontosProfissonal() {

    const arr = [];

    for (let i = 0; i < this.resultado.length; i++) {
      /*
      * Média Poderada
      */
      const resultado = this.mediaPonderada(this.resultado[i], this.pontosGrafico[i], this.anosTrabalhados, 1);

      arr.push(resultado);

    }

    this.radarChart.datasets[1].data = arr;

  }

  private mediaPonderada(valorGrafico: number, valorResposta: number, valorPesoGrafico: number, ValorPesoResposta: number) {
    const resposta = ((valorGrafico * valorPesoGrafico) + (valorResposta * ValorPesoResposta) / valorPesoGrafico + ValorPesoResposta);

    return resposta > 100 ? 100 : resposta;
  }

  ngOnInit() {
    this.retornaPontosProfissonal();

  }
}
