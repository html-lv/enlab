import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../../../core/interfaces/table-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @Input() item: any;
  @Input() set configValue(config: TableConfig) {
    this.config = config;
    this.value = config.key.split('.').reduce((obj, key) => obj?.[key], this.item);
  }
  value: string = '';
  config!: TableConfig;
}
