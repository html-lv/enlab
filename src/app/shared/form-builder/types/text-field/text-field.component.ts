import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { formFieldBuilder } from '../../../../core/interfaces/table-interface';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {
  @Input() resetTrigger$: Subject<void> = new Subject<void>();
  @Input() control!: FormControl;
  @Input() set field(data: formFieldBuilder) {
    this.placeHolder = data?.placeholder || '';
    this.label = data?.label || '';
  }
  placeHolder: string = '';
  label: string = '';
}
