import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../../../core/interfaces/table-interface';

@Component({
  selector: 'app-user-action',
  standalone: true,
  imports: [],
  templateUrl: './user-action.component.html',
  styleUrl: './user-action.component.scss'
})
export class UserActionComponent {
  @Input() item: any;
  @Input() configValue!: TableConfig;
}
