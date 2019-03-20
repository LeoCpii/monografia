import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { peopleData, barChart, lineChart, radarChart, donutPieChart } from './../../../shared/models/elements';
import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'profissional-grafico-page',
  templateUrl: './profissional-grafico.page.html',
})

export class ProfissionalGraficoPage implements OnInit {

  constructor(private router: Router) {
    this.editChart = {
      labels: ['Corrida', 'Natação', 'Futebol', 'Ciclismo'],
      datasets: [
        {
          data: [50, 50, 50, 50],
          label: 'Series A',
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
    corrida: new FormControl(50),
    natacao: new FormControl(50),
    futebol: new FormControl(50),
    ciclismo: new FormControl(50),
  });

  ngOnInit() {
    this.getDataGraph();
  }

  getDataGraph() {
    this.form.valueChanges.subscribe(response => {
      const data = [];

      data.push(
        Number(response.corrida),
        Number(response.natacao),
        Number(response.futebol),
        Number(response.ciclismo),
      );

      const clone = JSON.parse(JSON.stringify(this.editChart.datasets));

      clone[0].data = data;

      this.editChart.datasets = clone;
    });
  }

  public submit() {
    console.log(this.form.value);
    this.router.navigate(['perguntas']);
  }
}
