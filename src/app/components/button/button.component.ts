import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'finance-button',
  imports: [MatButtonModule],
  template: `
    <button 
      mat-raised-button 
      [type]="type" 
      [disabled]="disabled"
      [color]="color">
      {{ text }}
    </button>
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