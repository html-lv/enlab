import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { formFieldBuilder } from '../../core/interfaces/table-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  @Output() saveDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetTrigger$: Subject<void> = new Subject<void>();
  @Input() saveTrigger$: Subject<void> = new Subject<void>();
  fildesReset$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({});
  unsubus$: Subject<boolean> = new Subject();
  fieldsList: formFieldBuilder[] = [];
  controlGroup: Record<string, FormControl> = {};
  currenntData: any;
  saveData: any;
  @Input()
  set setForm(fieldList: formFieldBuilder[]) {
    this.fieldsList = fieldList;
    this.form = this.generateForm(this.fieldsList);
    this.currenntData = this.form.value;
  }
  constructor() {}

  generateForm(fieldsList: formFieldBuilder[]): FormGroup {
    console.log(fieldsList)
    fieldsList.forEach((field: formFieldBuilder) => {
      this.controlGroup[field.formControlName] = new FormControl(field.value, field.validators);
    });
    return new FormGroup(this.controlGroup);
  }

  ngOnInit(): void {
    this.resetTrigger$.pipe(takeUntil(this.unsubus$)).subscribe(() => {
      this.fildesReset$.next();
      this.form.patchValue(this.currenntData);
    });
    this.saveTrigger$.pipe(takeUntil(this.unsubus$)).subscribe(() => {
      this.saveDataEmitter.emit({ data: this.form.value, destroy: false });
    });
  }

  ngOnDestroy(): void {
    this.saveDataEmitter.emit({ data: this.form.value, destroy: true });
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
