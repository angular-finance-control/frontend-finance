import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';

// Importar e registrar os componentes necessários do Chart.js para os testes
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';
import { ChartClickType, ChartHoverType } from '../../shared/types/chart';

// Registrar os componentes antes dos testes
Chart.register(ArcElement, Tooltip, Legend, PieController);

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChartComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty chart data', () => {
    expect(component.chartData()).toEqual([]);
  });

  it('should handle chart click events', () => {
    spyOn(console, 'log');
    
    const mockEvent = { event: 'click', active: [] } as unknown as ChartClickType;
    component.chartClicked(mockEvent);
    
    expect(console.log).toHaveBeenCalledWith('click', []);
  });

  it('should handle chart hover events', () => {
    spyOn(console, 'log');
    
    const mockEvent = { event: 'hover', active: [] } as unknown as ChartHoverType;
    component.chartHovered(mockEvent);
    
    expect(console.log).toHaveBeenCalledWith('hover', []);
  });
});