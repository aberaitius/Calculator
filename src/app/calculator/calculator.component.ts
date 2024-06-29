import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display: string = '0';
  currentOperand: string = '';
  previousOperand: string = '';
  operation: string | null = null;
  calculationComplete: boolean = false;

  appendNumber(number: string) {
    if (this.calculationComplete) {
      this.currentOperand = '';
      this.calculationComplete = false;
    }

    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  selectOperation(operation: string) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.calculationComplete = false;
  }

  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = null;
    this.previousOperand = '';
    this.updateDisplay();
    this.calculationComplete = true;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
    this.updateDisplay();
    this.calculationComplete = false;
  }

  negate() {
    if (this.currentOperand) {
      this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
      this.updateDisplay();
    }
  }

  percent() {
    if (this.currentOperand) {
      this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
      this.updateDisplay();
    }
  }

  updateDisplay() {
    this.display = this.currentOperand || '0';
  }
}
