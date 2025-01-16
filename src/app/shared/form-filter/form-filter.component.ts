import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputComponent } from '../input/base-input/base-input.component';
import { SearchInputComponent } from '../input/search-input/search-input.component';
import { TableConfig } from '../../core/interfaces/table-interface';

@Component({
  selector: 'app-form-filter',
  standalone: true,
  imports: [FormsModule, BaseInputComponent, SearchInputComponent],
  templateUrl: './form-filter.component.html',
  styleUrl: './form-filter.component.scss'
})
export class FormFilterComponent {
  @Output() applyFilterEvent = new EventEmitter<string>();
  @Input() data: any;
  @Input() columnConfig: TableConfig[] = [];
  @Input() set setConfig(value: any) {
    if (value.filters) {
      this.filtersValues = Array.from({ length: Object.values(value.filters).length }, () => []);
    }
    this.config = value?.filters;
    this.needSettings = value?.needSettings;
    this.addNewTableItem = value?.addNewTableItem;
  }
  filters: string[] = [];
  filtersValues: any = [];
  config: any;

  needSettings: boolean = false;
  addNewTableItem: any = {};

  constructor() {}

  saveInputValue(item: any, index: number) {
    this.filtersValues[index] = [...item];
  }
  reset() {
    this.filtersValues = Array.from({ length: this.config.length }, () => []);
    this.applyFilterEvent.emit();
  }

  apply() {
    const applyFilter = this.config.reduce((acc: any, element: any, index: number) => {
      if (this.filtersValues[index].length > 0) {
        let filterArr = this.filtersValues[index];
  
        if (element?.query.type !== 'string') {
          return acc;
        }

        const filterValue = filterArr.join(',');
        acc[element.id] = filterValue;
      }
      return acc;
    }, {});
  
    console.log(applyFilter);
  
    this.applyFilterEvent.emit(Object.values(applyFilter).join(','));
  }
  
  
}
