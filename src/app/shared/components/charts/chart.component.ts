import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'cp-chart-bar',
  templateUrl: './chart.component.html'
})

export class ChartComponent {
  @Input() datasets: ChartDataSets[];
  @Input() labels: Label[];
  @Input() legend?= false;
  @Input() chartType: ChartType;
  @Input() colors: Color[];
  @Input() label: string;
  @Input() options?: any;

  public barChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 800,
  };
}
