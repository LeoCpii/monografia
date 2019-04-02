import { Component, OnInit } from '@angular/core';
import { barChart } from './../../../shared/models/elements';
import { StorageService } from 'src/app/shared/services/storage.service';
import { RadialChartOptions } from 'chart.js';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

export interface IProfissionalAgradecimentoPage {
  nivel: Niveis;
  profissao: Profissao;
  area: Area;
  profissionais: Profissional;
  contribuidores: Contribuidores;
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

  public radarChart: any = {
    labels: ['Comunicatividade', 'Organizacao', 'Criatividade', 'Detalhismo', 'Lideranca', 'Proatividade'],
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
    const arr = [];

    for (let i = 0; i < this.resultado.length; i++) {
      /*
      * Média Poderada
      */
      const resultado = this.mediaPonderada(this.resultado[i], this.pontosGrafico[i], this.data.nivel.value, 1);

      arr.push(resultado);
    }

    this.radarChart.datasets[1].data = arr; // Sua pontuação
    this.radarChart.datasets[0].data = this.data.profissao['profissao'].pontos; // Pontuação da área
    this.radarChart.datasets[0].label = 'Pontuação da área'; // Pontuação da área
  }

  public atualizaGraficoBarras() {
    this.barChart.labels = this.data.contribuidores.profissao;
    this.barChart.datasets[0].data = this.data.contribuidores.numeroColaboradores;
    /*TODO- Usado para ajustar a escala do grafico de barras*/
    this.barChart.datasets[0].data.push(0);
  }

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

    this.radarChart.datasets[0] = this.data.profissao['profissao'].pontos;

    console.log(this.data);

    /*
    * Atualiza Graficos
    */
    this.atualizaGraficoRadar();
    this.atualizaGraficoBarras();
  }

  scroll(e: HTMLElement) {
    this.utils.scroll(e);
  }

}
