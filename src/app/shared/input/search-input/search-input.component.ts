import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  HostListener,
  inject,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { TruncatePipe } from '../../../core/pipe/truncate.pipe';
import { AccordionComponent } from "../../accordion/accordion.component";


@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule, TruncatePipe, MatIconModule, AccordionComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() saveInputValueEvent = new EventEmitter<string[]>();
  @Input() inputLabel: string = '';
  @Input() itemsId: string = '';
  @Input() data: any;
  @Input() saveInputValue: any[] = [];
  filteredData: any;
  unsubus$: Subject<boolean> = new Subject();
  open: boolean = false;

  form = new FormGroup({
    inputValue: new FormControl(''),
  });

  constructor(private elementRef: ElementRef){
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  ngOnInit() {
    this.filteredData = this.data;
    this.form.valueChanges.pipe(takeUntil(this.unsubus$)).subscribe((newValue) => {
      const inputValue = newValue?.inputValue?.toLowerCase() || '';
      this.filteredData = this.data.filter((item: any) =>
        (item.title || item[this.itemsId]).toLowerCase().startsWith(inputValue)
      );
    });
  }

  enterClick(item: any) {

    if (!this.saveInputValue.includes(item)) {
      this.saveInputValue.push(item);
    }
    console.log(this.saveInputValue)
    this.saveInputValueEvent.emit(this.saveInputValue);
  }

  deletFilter(index: number) {
    this.saveInputValue.splice(index, 1);
    this.saveInputValueEvent.emit(this.saveInputValue);
  }

  clickOnInput() {
    const inputElement = document.querySelector(`input[id="inputId${this.inputLabel}"]`) as HTMLInputElement;
    this.open = true;
    if (inputElement) {
      inputElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
