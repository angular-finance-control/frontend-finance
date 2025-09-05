import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { List, ListType } from '../../shared/types/list';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'finance-list',
  imports: [ MatListModule, MatIconModule, CurrencyPipe],
  template: `
  @if (items.length > 0) {
    <mat-list class="list">
      @for (item of items; track $index) {
        <mat-list-item class="list-item">
          <mat-icon class="list-icon">{{ item.icon }}</mat-icon>
          <mat-list-item class="list-value">{{ item.type }}</mat-list-item>
          <mat-list-item class="list-value">{{ item.value / 100 | currency: 'BRL' : 'symbol' : '1.2-2' }}</mat-list-item>
          <mat-icon class="list-icon delete-icon" (click)="deleteItem($index)">delete</mat-icon>
        </mat-list-item>
      }
    </mat-list>
  }
  @else {
    <p class="no-items">Nenhum item encontrado</p>
  }
  `,
  styleUrl: './list.component.scss',
  standalone: true
})
export class ListComponent {

  @Input() items: List[] = [];
  @Output() listUpdate = new EventEmitter<List[]>();

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.listUpdate.emit(this.items);
  }
}
