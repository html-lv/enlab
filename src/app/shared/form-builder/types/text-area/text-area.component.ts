import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { formFieldBuilder } from '../../../../core/interfaces/table-interface';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {
  @Input() resetTrigger$: Subject<void> = new Subject<void>();
  @Input() set field(data: formFieldBuilder) {
    this.placeHolder = data?.placeholder || '';
    this.label = data?.label || '';
  }
  @Input() control!: FormControl;
  placeHolder: string = '';
  label: string = '';
}
