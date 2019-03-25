import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { peopleData, barChart, lineChart, radarChart, donutPieChart } from './../../../shared/models/elements';
import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'profissional-grafico-page',
  templateUrl: './profissional-grafico.page.html',
})

export class ProfissionalGraficoPage implements OnInit {

  constructor(
    private router: Router,
    private storage: StorageService
    ) {
    this.editChart = {
      labels: ['Comunicatividade', 'Organização', 'Criatividade', 'Detalhismo', 'Liderança', 'Proatividade'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0],
          label: 'Pontuação de personalidade',
        },
      ]
    };
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
    comunicatividade: new FormControl(0),
    organizacao: new FormControl(0),
    criatividade: new FormControl(0),
    detalhismo: new FormControl(0),
    lideranca: new FormControl(0),
    proatividade: new FormControl(0),
  });

  ngOnInit() {
    this.storage.remove('grafico')
    this.getDataGraph();
  }

  getDataGraph() {
    this.form.valueChanges.subscribe(response => {
      const data = [];

      data.push(
        Number(response.comunicatividade),
        Number(response.organizacao),
        Number(response.criatividade),
        Number(response.detalhismo),
        Number(response.lideranca),
        Number(response.proatividade),
      );

      const clone = JSON.parse(JSON.stringify(this.editChart.datasets));

      clone[0].data = data;

      this.editChart.datasets = clone;
    });
  }

  private ir() {
    this.router.navigate(['perguntas', 'profissional']);
  }

  public submit() {
    this.storage.setJson('grafico', this.editChart.datasets[0].data);
    this.ir();
  }
}
