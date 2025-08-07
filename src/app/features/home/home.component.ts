import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'finance-home',
  imports: [SliderComponent],
  standalone: true,
  template: `
    <p>silder down</p>
    <finance-slider id="slider1" />
    <finance-slider id="slider2" />
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
