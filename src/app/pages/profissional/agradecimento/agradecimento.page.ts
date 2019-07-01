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

  public radarChart: any = {
    labels: [''],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Sua pontuação'
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Pontuação da área'
      }
    ],
    colors: [{
      borderColor: 'rgb(255, 74, 59)',
      backgroundColor: 'rgba(255, 74, 59, 0.3)',
      pointBackgroundColor: 'rgba(255, 74, 59, 0.3)',
      pointBorderColor: 'rgb(255, 74, 59)',
    },
    {
      borderColor: 'rgb(75, 75, 75)',
      backgroundColor: 'rgba(75, 75, 75, 0.3)',
      pointBackgroundColor: 'rgba(75, 75, 75, 0.3)',
      pointBorderColor: 'rgb(75, 75, 75)',
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
    this.radarChart.labels = this.data.resultado.description.caracteristicaGrafico.slice(0, 6);
    this.radarChart.datasets[1].data = this.data.profissaoResultado.description.relevanciaProfissao.slice(0, 6); // Pontuação da área
    this.radarChart.datasets[0].data = this.data.resultado.description.valorGrafico.slice(0, 6); // Sua pontuação
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.data = this.route.snapshot.data['data'];
      }
    });

    /*
    * Atualiza Graficos
    */
    this.atualizaGraficoRadar();
  }

  scroll(e: HTMLElement) {
    this.utils.scroll(e);
  }

}
