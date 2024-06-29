import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-root',
  template: `<app-calculator></app-calculator>`,
  standalone: true,
  imports: [CalculatorComponent]
})
export class AppComponent {
}
