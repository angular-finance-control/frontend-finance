import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'finance-chart',
  imports: [ BaseChartDirective ],
  standalone: true,
  template: `
    <p>chart works!</p>

    <canvas
      baseChart
      [data]="pieChartData"
      [type]="pieChartType"
      [options]="pieChartOptions"
    >
    </canvas>
  `,
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  @Input() chartData: {label: string, value: number, color: string}[] = [];
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };
  
  pieChartType: ChartType = 'pie';
  
  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      this.updateChartData();
    }
  }

  private updateChartData() {
    // Filtra apenas os dados com valor > 0 para não mostrar fatias vazias
    const filteredData = this.chartData.filter(item => item.value > 0);
    
    this.pieChartData = {
      labels: filteredData.map(item => `${item.label} (${item.value}%)`),
      datasets: [
        {
          data: filteredData.map(item => item.value),
          backgroundColor: filteredData.map(item => item.color),
          hoverBackgroundColor: filteredData.map(item => item.color)
        }
      ]
    };

    // Força a atualização do gráfico
    if (this.chart) {
      this.chart.update();
    }
  }

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