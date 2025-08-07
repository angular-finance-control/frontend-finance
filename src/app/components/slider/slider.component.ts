import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'finance-slider',
  imports: [ FormsModule, MatSliderModule ],
  standalone: true,
  template: `
    <div>
      <p>{{ label }}</p>
      <mat-slider
            class="slider"
            [disabled]="disabled"
            [max]="max"
            [min]="min"
            [step]="step"
            [id]="id"
            [discrete]="thumbLabel"
            [showTickMarks]="showTicks"
            [displayWith]="formatLabel">
          <input matSliderThumb [(ngModel)]="value" #slider>
        </mat-slider>
    </div>
  `,
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() id = '';
  
  @Input() max = 100;
  @Input() min = 0;
  @Input() step = 1;
  @Input() value = 0;
  
  @Input() thumbLabel = true;
  @Input() showTicks = false;
  @Input() disabled = false;

  @Input() label = '';

  formatLabel = (value: number) => `${value}%`;
}
