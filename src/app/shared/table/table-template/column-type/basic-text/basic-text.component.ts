import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../../../core/interfaces/table-interface';

@Component({
  selector: 'app-basic-text',
  standalone: true,
  imports: [],
  templateUrl: './basic-text.component.html',
  styleUrl: './basic-text.component.scss'
})
export class BasicTextComponent {
  @Input() item: any;
  @Input() configValue!: TableConfig;
}
