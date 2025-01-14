import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../../../core/interfaces/table-interface';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  @Input() item: any;
  @Input() configValue!: TableConfig;
}
