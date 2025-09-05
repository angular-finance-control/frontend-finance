import { Component, computed, signal } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { CommonModule } from '@angular/common';
import { ChartDataType } from '../../shared/types/chart';
import { TopComponent } from '../../components/menus/top/top.component';
import { SelectItems } from '../../shared/types/select';
import { FormComponent } from "../../components/form/form.component";
import { FormConfig, FormData } from "../../shared/types/formData";
import { ListComponent } from '../../components/list/list.component';
import { List, ListType } from '../../shared/types/list';
import { formConfig } from './config/config';
import { iconHelper } from '../../shared/utils/helper/icon.helper';
import { colorChartHelper } from '../../shared/utils/helper/color-chart.helper';

@Component({
  selector: 'finance-home',
  imports: [
    ChartComponent,
    CommonModule,
    TopComponent,
    FormComponent,
    ListComponent
  ],
  standalone: true,
  template: `
    <div class="container">
      <finance-menu-top/>

      <p>Este é um projeto com fins de estudo de programação</p>
      <p>Insira os gastos abaixo em cada categoria</p>

      <div class="container-inputs-values">
        <finance-expense-form
          [typeOptions]="expenseTypeOptions"
          [config]="formConfig"
          [isLoading]="isProcessing()"
          (formSubmit)="onExpenseSubmit($event)"
        />
      </div>

      <finance-list 
        [items]="list()" 
        (listUpdate)="updateList($event)"
      />
      
      <div class="container-data">
        <div class="left">
          <finance-chart [chartData]="chartData()" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  expenseTypeOptions: SelectItems[] = [
    { value: ListType.LUXO, viewValue: 'Luxo' },
    { value: ListType.ALIMENTACAO, viewValue: 'Alimentação' },
    { value: ListType.CONTAS_FIXAS, viewValue: 'Contas Fixas' }
  ];

  formConfig: FormConfig = formConfig;
  isProcessing = signal<boolean>(false);
  lastExpense = signal<FormData | null>(null);

  list = signal<List[]>([]);

  chartData = computed(() => {
    const groupedData = this.list()
      .filter(item => item.value > 0)
      .reduce((acc, item) => {
        
        const existingItem = acc.find(group => group.label === item.type);
        
        if (existingItem) {
          existingItem.value += item.value;
        } else {
          acc.push({
            label: item.type,
            value: item.value,
            color: colorChartHelper(item.type)
          });
        }
        
        return acc;
      }, [] as ChartDataType[]);
  
    return groupedData;
  });

  onExpenseSubmit(expenseData: FormData) {
    this.isProcessing.set(true);

    this.list.update((currentList: List[]) => [
      ...currentList, 
      { 
        type: expenseData.type as ListType, 
        value: expenseData.value, 
        icon: iconHelper(expenseData.type as ListType) 
      }
    ]);
    
    setTimeout(() => {
      this.lastExpense.set(expenseData);
      this.isProcessing.set(false);
    }, 500);
  }

  updateList(updatedList: List[]) {
    this.list.set([...updatedList]);
  }

  removeItem(index: number) {
    this.list.update(currentList => 
      currentList.filter((_, i) => i !== index)
    );
  }

  clearList() {
    this.list.set([]);
  }

  getTotalValue(): number {
    return this.list().reduce((sum, item) => sum + item.value, 0);
  }
}