import { Component, OnInit } from '@angular/core';
import { peopleData, barChart, lineChart, radarChart, donutPieChart } from './../../../shared/models/elements';
import { FormatterService } from './../../../shared/services/formatter.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-styleguide',
  templateUrl: './styleguide.page.html',
})
export class StyleguidePage implements OnInit {

  constructor(
    private formatter: FormatterService,
    private formBuilder: FormBuilder,
  ) {
    this.editChart = {
      labels: ['Corrida', 'Natação', 'Futebol', 'Ciclismo'],
      datasets: [
        {
          data: this.refreshDataGraph,
        },
      ]
    };
  }
  public actionButtonIsLoading = false;
  public submitButtonIsLoading = false;
  public feedback = false;

  public dinheiro = 50;
  public date = '02032019';
  public buttonBlock = true;
  public valueDropDown = '';
  public mensagensSenha: any[];
  public barChartData = barChart;
  public pieChartData = donutPieChart;
  public donutChartData = donutPieChart;
  public lineChartData = lineChart;
  public radarChartData = radarChart;
  public refreshDataGraph = [50, 50, 50, 50];

  public form = new FormGroup({});

  public formGraph = new FormGroup({
    corrida: new FormControl(50),
    natacao: new FormControl(50),
    futebol: new FormControl(50),
    ciclismo: new FormControl(50),
  });

  public tableData: any = peopleData;

  public editChart: any;

  public fieldSelect = {
    model: '',
    data: [
      { label: 'Desenvolvedor', value: '1' },
      { label: 'Analista', value: '2' },
      { label: 'Gerente', value: '3' },
      { label: 'Diretor', value: '4' },
    ],
  };

  public dictListValue = {
    'Total de créditos': this.formatter.currency(4730.50),
    'Total de débitos': this.formatter.currency(1631.24),
    'Total IR': this.formatter.currency(0),
    'Total ISS': this.formatter.currency(0),
    'Total IRRF': this.formatter.currency(0),
    'Total INSS': this.formatter.currency(0),
    'Total PIS': this.formatter.currency(0),
    'Total COFINS': this.formatter.currency(0),
    'Total CSLL': this.formatter.currency(0),
    'Líquido a receber': this.formatter.currency(3099.26),
  };

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      profissao: ['', [Validators.required]],
      agree: [false, [Validators.pattern('true')]],
    }, { validators: this.validarSenhas });

    this.getDataGraph();

  }

  buttonActionActive(): void {
    this.actionButtonIsLoading = !this.actionButtonIsLoading;

    setTimeout(() => {
      this.actionButtonIsLoading = !this.actionButtonIsLoading;
    }, 1500);
  }

  public recuperaValorDropDown(value: string): void {
    this.valueDropDown = value;
  }

  public statusPessoa(row: any): string {
    const objTmpl = {
      class: '',
      label: ''
    };

    if (row.status) {
      objTmpl.label = 'ATIVO';
      objTmpl.class = 'success';
    } else {
      objTmpl.label = 'CANCELADO';
      objTmpl.class = 'danger';
    }

    return `<span class="text-${objTmpl.class}">${objTmpl.label}</span>`;
  }

  public validarSenhas(c: FormControl) {
    const senhasIguais: boolean = c.value.password === c.value.passwordConfirm;
    return senhasIguais ? null : { validarSenhas: { valid: false } };
  }

  public verificaSenhas(senha: string, confSenha: string) {
    if (senha === '' || confSenha === '') {
      return false;
    } else {
      const senhasIguais: boolean = senha === confSenha;

      if (!senhasIguais) {
        return true;
      } else {
        return false;
      }
    }
  }

  submit() {
    this.submitButtonIsLoading = true;

    setTimeout(() => {
      this.feedback = true;
      this.submitButtonIsLoading = false;
    }, 3000);
  }

  getDataGraph() {
    this.formGraph.valueChanges.subscribe(response => {
      const data = [];

      data.push(
        Number(response.corrida),
        Number(response.natacao),
        Number(response.ciclismo),
        Number(response.futebol)
      );

      this.atualizarGrafico(data);
    });
  }

  atualizarGrafico(data) {
    this.editChart.datasets[0].data = [];
    this.editChart.datasets[0].data = data;
  }
}
