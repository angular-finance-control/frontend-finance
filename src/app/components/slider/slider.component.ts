import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'finance-slider',
  imports: [ FormsModule, MatSliderModule ],
  standalone: true,
  template: `
    <div class="slider-container">
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
            [displayWith]="formatLabel"
            [style.width.px]="sliderWidth">
          <input matSliderThumb [(ngModel)]="value" #slider (ngModelChange)="valueChange.emit({value: $event, id: id})">
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

  @Output() valueChange = new EventEmitter<{value: number, id: string}>();

  formatLabel = (value: number) => `${value}%`;

  get sliderWidth(): number {
    const minWidth = 96;
    const maxWidth = 320;
    return minWidth + ((this.max / 100) * (maxWidth - minWidth));
  }
}