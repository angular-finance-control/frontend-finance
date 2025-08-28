import { Component } from '@angular/core';

@Component({
  selector: 'finance-menu-top',
  imports: [],
  template: `
  <div class="container-menu-top">
    <div class="left">
      <img src="/assets/logo.png" alt="logo" class="logo">
    </div>
    <div class="center">
      <h2 class="title">Controle de gastos</h2>
    </div>
    <div class="right"></div>
  </div>
`,
  styleUrl: './top.component.scss',
  standalone: true
})
export class TopComponent {

}
