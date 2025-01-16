import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig } from '../../../core/interfaces/table-interface';
import { CommonModule } from '@angular/common';
import { FormFilterComponent } from '../../form-filter/form-filter.component';

@Component({
  selector: 'app-table-template',
  standalone: true,
  imports: [CommonModule, FormFilterComponent],
  templateUrl: './table-template.component.html',
  styleUrl: './table-template.component.scss'
})
export class TableTemplateComponent {
  @Input() tableName: string = '';

  @Input() set setData(value: any[]) {
    this.data = this.originalData = value;
  }
  @Input() set setConfig(value: TableConfig[]) {
    this.config = this.showConfig = value;
  }

  @Input() filterConfig: any;
  @Input() filterData: any;

  @Output() applyFilterEvent = new EventEmitter<any>();

  unsubus$: Subject<boolean> = new Subject();
  data: any[] = [];
  originalData: any = [];
  config: TableConfig[] = [];
  showConfig: TableConfig[] = [];

  constructor(

  ) {}

  ngOnInit(): void {
  }

  filter(filters: any) {
    this.applyFilterEvent.emit(filters);
  }

  ngOnDestroy(): void {
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
