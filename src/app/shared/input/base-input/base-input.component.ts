import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TruncatePipe } from '../../../core/pipe/truncate.pipe';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [ReactiveFormsModule, TruncatePipe],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss'
})
export class BaseInputComponent {
  @Output() saveInputValueEvent = new EventEmitter<string[]>();
  @Input() inputLabel: string = '';
  @Input() saveInputValue: any[] = [];
  unsubus$: Subject<boolean> = new Subject();

  form = new FormGroup({
    inputValue: new FormControl(''),
  });

  enterClick() {
    if (this.form.get('inputValue')?.value) {
      this.saveInputValue.push(this.form.get('inputValue')?.value);
      this.form.get('inputValue')?.setValue('');
      this.saveInputValueEvent.emit(this.saveInputValue);
    }
  }

  deletFilter(index: number) {
    this.saveInputValue.splice(index, 1);
    this.saveInputValueEvent.emit(this.saveInputValue);
  }

  clickOnInput() {
    const inputElement = document.querySelector(`input[id="inputId${this.inputLabel}"]`) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }
}
