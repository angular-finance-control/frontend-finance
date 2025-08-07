import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { ChartComponent } from '../../components/chart/chart.component';

@Component({
  selector: 'finance-home',
  imports: [SliderComponent, ChartComponent],
  standalone: true,
  template: `
    <div class="container">
      <div class="left">
        <p>left</p>
        <finance-chart />
      </div>
      <div class="right">
        <p>right</p>
        <finance-slider id="slider-1" label="Luxo" />
        <finance-slider id="slider-2" label="Alimentação" />
        <finance-slider id="slider-3" label="Contas Fixas" />
      </div>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
