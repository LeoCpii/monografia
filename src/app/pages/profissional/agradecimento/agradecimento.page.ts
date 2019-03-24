import { Component, OnInit } from '@angular/core';
import { radarChart} from './../../../shared/models/elements';

@Component({
  selector: 'agradecimento-page',
  templateUrl: './agradecimento.page.html',
  styleUrls: ['./agradecimento.page.css']
})

export class AgradecimentosPage implements OnInit {

  constructor() { }

  public radarChartData = radarChart;

  ngOnInit() { }
}
