import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'finance-slider',
  imports: [ FormsModule, MatSliderModule ],
  standalone: true,
  template: `
   <mat-slider
        class="example-margin"
        [disabled]="disabled"
        [max]="max"
        [min]="min"
        [step]="step"
        [id]="id"
        [discrete]="thumbLabel"
        [showTickMarks]="showTicks">
      <input matSliderThumb [(ngModel)]="value" #slider>
    </mat-slider>`,
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() id: string = '';
  
  value = 0;
  max = 100;
  min = 0;
  thumbLabel = true;
  showTicks = false;
  disabled = false;
  step = 1;
}
