import { Component, ViewChild, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartClickType, ChartDataType, ChartHoverType } from '../../shared/types/chart';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'finance-chart',
  imports: [ BaseChartDirective ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
export class ChartComponent implements OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  @Input() chartData: ChartDataType[] = [];
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
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

  private updateSubject = new Subject<ChartDataType[]>();
  private subscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
    this.subscription = this.updateSubject.pipe(
      debounceTime(1000)
    ).subscribe((data) => {
      this.performChartUpdate(data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData) {
      this.updateSubject.next([...this.chartData]);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private performChartUpdate(data: ChartDataType[]) {
    const filteredData = data.filter(item => item.value > 0);
    
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

    if (this.chart) {
      this.chart.update();
    }
    
    this.cdr.detectChanges();
  }

  public chartClicked({ event, active} : ChartClickType): void {
    console.log(event, active);
  }

  public chartHovered({ event, active } : ChartHoverType): void {
    console.log(event, active);
  }
}