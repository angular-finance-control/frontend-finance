import { Component, ViewChild, input, computed, effect, signal } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartClickType, ChartDataType, ChartHoverType } from '../../shared/types/chart';

@Component({
  selector: 'finance-chart',
  imports: [ BaseChartDirective ],
  standalone: true,
  template: `
    @if(chartData().length > 0) {
        <canvas
          baseChart
          [data]="pieChartData()"
          [type]="pieChartType"
          [options]="pieChartOptions"
        >
        </canvas>
    } @else {
        <p class="no-data">Esperando os dados para gerar o gráfico</p>
    }
  `,
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  chartData = input<ChartDataType[]>([]);
  
  private debouncedData = signal<ChartDataType[]>([]);
  
  pieChartData = computed(() => {
    const data = this.debouncedData();
    
    return {
      labels: data.map(item => `${item.label} (${item.value}%)`),
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: data.map(item => item.color),
          hoverBackgroundColor: data.map(item => item.color),
        }
      ]
    } as ChartData<'pie', number[], string | string[]>;
  });
  
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

  private debounceTimer: any;

  constructor() {
    effect(() => {
      const newData = this.chartData();
      
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      this.debounceTimer = setTimeout(() => {
        this.debouncedData.set([...newData]);
        
        setTimeout(() => {
          if (this.chart) {
            this.chart.update();
          }
        }, 0);
      }, 1000);
    });
  }

  public chartClicked({ event, active} : ChartClickType): void {
    console.log(event, active);
  }

  public chartHovered({ event, active } : ChartHoverType): void {
    console.log(event, active);
  }
}