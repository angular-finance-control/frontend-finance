import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { CommonModule } from '@angular/common';
import { Slider } from '../../shared/types/slider';
import { EventEmitterSlider } from '../../shared/types/slider';
import { ChartDataType } from '../../shared/types/chart';

@Component({
  selector: 'finance-home',
  imports: [SliderComponent, ChartComponent, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  sliders: Slider[] = [
    { id: 'slider-1', label: 'Luxo', value: 0, disabled: false, max: 100, color: '#FF6384' },
    { id: 'slider-2', label: 'Alimentação', value: 0, disabled: false, max: 100, color: '#36A2EB' },
    { id: 'slider-3', label: 'Contas Fixas', value: 0, disabled: false, max: 100, color: '#FFCE56' }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  get chartData(): ChartDataType[] {
    const total = this.sliders.reduce((sum, slider) => sum + slider.value, 0);
    const remaining = 100 - total;

    const baseData = this.sliders.map(({ label, value, color }) => ({ label, value, color }));

    if (remaining > 0) {
      baseData.push({
        label: 'Sobra',
        value: remaining,
        color: '#FFFFFF'
      });
    }

    return baseData;
  }

  handleSliderChange(event: EventEmitterSlider) {
    const { id, value } = event;
    
    this.sliders = this.sliders.map((slider) => {
      if (slider.id === id) { 
        return { ...slider, value };
      }
      return slider;
    });

    this.updateMaxValues();
    this.cdr.detectChanges();
  }

  private updateMaxValues() {
    const total = this.sliders.reduce((sum, slider) => sum + slider.value, 0);
    const remaining = 100 - total;

    if (remaining > 0) {
      this.sliders = this.sliders.map((slider) => {
        const newMax = slider.value + remaining;
        return { 
          ...slider, 
          max: Math.min(100, Math.max(slider.value, newMax))
        };
      });
    }
  }
}