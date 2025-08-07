import { Component, ViewChild, input, computed, effect, signal } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartClickType, ChartDataType, ChartHoverType } from '../../shared/types/chart';

@Component({
  selector: 'finance-chart',
  imports: [ BaseChartDirective ],
  standalone: true,
  template: `
      <canvas
        baseChart
        [data]="pieChartData()"
        [type]="pieChartType"
        [options]="pieChartOptions"
      >
      </canvas>
  `,
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  // Input signal (Angular 17.2+)
  chartData = input<ChartDataType[]>([]);
  
  // Signal para controlar debounce
  private debouncedData = signal<ChartDataType[]>([]);
  
  // Computed signal que gera dados do gráfico
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
    // Effect para debounce - reage a mudanças no chartData
    effect(() => {
      const newData = this.chartData();
      
      // Limpa timer anterior
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      // Agenda atualização com debounce
      this.debounceTimer = setTimeout(() => {
        console.log('Atualizando gráfico após debounce...');
        this.debouncedData.set([...newData]);
        
        // Force chart update
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