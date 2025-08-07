import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'finance-home',
  imports: [SliderComponent],
  standalone: true,
  template: `
    <div class="container">
      <div class="left">
        <p>left</p>
      </div>
      <div class="right">
        <p>right</p>
        <finance-slider id="slider1" label="slider1" />
        <finance-slider id="slider2" label="slider2" />
      </div>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
