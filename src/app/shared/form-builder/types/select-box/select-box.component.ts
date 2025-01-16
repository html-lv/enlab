import {   
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { formFieldBuilder } from '../../../../core/interfaces/table-interface';
import { TruncatePipe } from '../../../../core/pipe/truncate.pipe';
import { AccordionComponent } from '../../../accordion/accordion.component';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [ReactiveFormsModule, AccordionComponent, TruncatePipe,],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.scss'
})
export class SelectBoxComponent implements OnInit, OnDestroy {
  @Input() resetTrigger$: Subject<void> = new Subject<void>();
  @Output() eventSaveInputValue = new EventEmitter<any>();
  @Input() set field(field: formFieldBuilder) {
    console.log(field);
    this.label = field?.label || '';
    this.data = field.data || [];
    if (field?.config?.onlyOne) {
      this.onlyOne = true;
    }
    this.findInitItems(field);
  }
  @Input() set control(control: FormControl) {
    this.controlInput = control;
  }
  form = new FormGroup({
    inputValue: new FormControl(''),
  });
  controlInput!: FormControl;
  label: string = '';
  data: any[] = [];
  filteredData: any[] = [];
  unsubus$: Subject<boolean> = new Subject();
  open: boolean = false;
  saveInputValue: any = [];
  firstInputValue: any = [];
  onlyOne: boolean = false;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.querySelector('div .block-form-input').contains(event.target)) {
      this.open = false;
    }
  }

  ngOnInit() {
    this.filteredData = this.data;
    this.form.valueChanges.pipe(takeUntil(this.unsubus$)).subscribe((newValue) => {
      console.log(newValue);
      const inputValue = newValue.inputValue?.toLowerCase() || '';
      this.filteredData = this.data.filter((item: any) => item.title?.toLowerCase().startsWith(inputValue));
    });

    this.resetTrigger$.pipe(takeUntil(this.unsubus$)).subscribe(() => {
      this.saveInputValue = [...this.firstInputValue];
    });
  }

  enterClick(item: any) {
    if (!this.saveInputValue.includes(item)) {
      this.changeSaveInput((input) => input.push(item));
    }
  }

  deletFilter(event: any, index: number) {
    event.preventDefault();
    this.changeSaveInput((input) => input.splice(index, 1));
  }

  clickOnInput() {
    const inputElement = document.querySelector(`input[id="inputId${this.label}"]`) as HTMLInputElement;
    this.open = true;
    if (inputElement) {
      inputElement.focus();
    }
  }

  findInitItems(field: any) {
    this.saveInputValue = [];
    const values = Array.isArray(field.value) ? field.value : [field.value];
    values
      .map((element: any) => field.data.find((item: any) => item.id === element?.id || item.id === element))
      .filter((item: any) => item)
      .forEach((item: any) => this.changeSaveInput((input) => input.push(item)));
    this.firstInputValue = [...this.saveInputValue];
  }

  changeSaveInput(action: (input: any[]) => void) {
    action(this.saveInputValue);
    if (this.onlyOne && this.saveInputValue?.length >= 2) {
      this.saveInputValue?.splice(0, 1);
    }
    this.eventSaveInputValue.emit(this.saveInputValue);
    // const ItemsIds = this.saveInputValue.map((item: any) => item.id);
    // this.controlInput?.patchValue(ItemsIds);
    this.controlInput?.patchValue(this.saveInputValue);
  }

  ngOnDestroy(): void {
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
