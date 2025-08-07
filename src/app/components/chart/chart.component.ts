import { Component, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'finance-chart',
  imports: [ BaseChartDirective ],
  standalone: true,
  template: `
    <div class="container">
      <canvas
        baseChart
        [data]="pieChartData"
        [type]="pieChartType"
        [options]="pieChartOptions"
      >
      </canvas>
    </div>
  `,
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9900'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9900'
        ]
      }
    ]
  };
  
  pieChartType: ChartType = 'pie'; // Tipagem explícita
  
  pieChartOptions = {
    responsive: true
  };

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}