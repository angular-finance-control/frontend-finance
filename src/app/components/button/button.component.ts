import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'finance-button',
  imports: [MatButtonModule],
  template: `
    <div class="button-container">
      <button 
        mat-raised-button 
        [type]="type" 
        [disabled]="disabled"
        [color]="color"
        class="button">
        {{ text }}
      </button>
    </div>
    `,
  styleUrl: './button.component.scss',
  standalone: true
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() text: string = 'Adicionar';
  @Input() disabled: boolean = false;
  @Input() color: string = 'primary';
}