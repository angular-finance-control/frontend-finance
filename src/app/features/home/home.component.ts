import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finance-home',
  imports: [SliderComponent, ChartComponent, CommonModule],
  standalone: true,
  template: `
    <div class="container">
      <h2>Financeiro</h2>
      <div class="container-data">
        <div class="left">
          <finance-chart [chartData]="chartData" />
        </div>
        <div class="right">
          @for (slider of sliders; track slider.id) {
            <finance-slider 
              [id]="slider.id" 
              [label]="slider.label" 
              [value]="slider.value" 
              [max]="slider.max"
              [disabled]="slider.disabled" 
              (valueChange)="handleSliderChange($event)"
            />
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sliders = [
    { id: 'slider-1', label: 'Luxo', value: 0, disabled: false, max: 100, color: '#FF6384' },
    { id: 'slider-2', label: 'Alimentação', value: 0, disabled: false, max: 100, color: '#36A2EB' },
    { id: 'slider-3', label: 'Contas Fixas', value: 0, disabled: false, max: 100, color: '#FFCE56' }
  ];

  get chartData() {
    return this.sliders.map(slider => ({
      label: slider.label,
      value: slider.value,
      color: slider.color
    }));
  }

  handleSliderChange(event: {value: number, id: string}) {
    const { id, value } = event;
    
    this.sliders = this.sliders.map((slider) => {
      if (slider.id === id) {
        return { ...slider, value };
      }
      return slider;
    });

    this.updateMaxValues();
  }

  private updateMaxValues() {
    const total = this.sliders.reduce((sum, slider) => sum + slider.value, 0);
    const remaining = 100 - total;

    this.sliders = this.sliders.map((slider) => {
      const newMax = slider.value + remaining;
      return { 
        ...slider, 
        max: Math.min(100, Math.max(slider.value, newMax))
      };
    });
  }
}