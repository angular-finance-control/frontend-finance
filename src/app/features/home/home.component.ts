import { Component, computed, signal } from '@angular/core';
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
  template: `
    <div class="container">
      <h2>Financeiro</h2>

      <p>Este é um projeto com fins de estudo</p>
      
      <div class="container-data">
        <div class="left">
          <finance-chart [chartData]="chartData()" />
        </div>
        <div class="right">
          @for (slider of slidersWithMaxUpdated(); track slider.id) {
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
  private sliders = signal<Slider[]>([
    { id: 'slider-1', label: 'Luxo', value: 0, disabled: false, max: 100, color: '#FF6384' },
    { id: 'slider-2', label: 'Alimentação', value: 0, disabled: false, max: 100, color: '#36A2EB' },
    { id: 'slider-3', label: 'Contas Fixas', value: 0, disabled: false, max: 100, color: '#FFCE56' }
  ]);

  private total = computed(() => 
    this.sliders().reduce((sum, slider) => sum + slider.value, 0)
  );

  private remaining = computed(() => 100 - this.total());

  slidersWithMaxUpdated = computed(() => {
    const remainingValue = this.remaining();
    
    return this.sliders().map(slider => ({
      ...slider,
      max: Math.min(100, Math.max(slider.value, slider.value + remainingValue))
    }));
  });

  chartData = computed(() => {
    const baseData: ChartDataType[] = this.sliders()
      .filter(slider => slider.value > 0)
      .map(slider => ({
        label: slider.label,
        value: slider.value,
        color: slider.color
      }));

    const remainingValue = this.remaining();
    if (remainingValue > 0) {
      baseData.push({
        label: 'Sobra',
        value: remainingValue,
        color: '#FFFFFF'
      });
    }

    return baseData;
  });

  handleSliderChange(event: EventEmitterSlider) {
    const { id, value } = event;
    
    this.sliders.update(currentSliders => 
      currentSliders.map(slider => 
        slider.id === id 
          ? { ...slider, value }
          : slider
      )
    );
  }
}