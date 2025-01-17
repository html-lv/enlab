import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../../../core/interfaces/table-interface';


@Component({
  selector: 'app-action',
  standalone: true,
  imports: [],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  @Input() item: any;
  @Input() configValue!: TableConfig;
}
