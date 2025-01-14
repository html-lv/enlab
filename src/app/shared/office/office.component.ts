import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableTemplateComponent } from "../table/table-template/table-template.component";
import { TableConfig } from '../../core/interfaces/table-interface';
import { BasicTextComponent } from '../table/table-template/column-type/basic-text/basic-text.component';
import { EmployeeInterface } from '../../core/interfaces/employee-interface';
import { ActionComponent } from '../table/table-template/column-type/action/action.component';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagsModalComponent } from '../tags-modal/tags-modal.component';

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [MatTableModule, TableTemplateComponent, MatDialogModule],
  templateUrl: './office.component.html',
  styleUrl: './office.component.scss'
})
export class OfficeComponent {
  dialog = inject(MatDialog);
  userTags: any[] = []

  employeeTableConfig: TableConfig[] = [
    { key: 'name', title: ['Name'], type: BasicTextComponent, show: true, columClass: 'flex-2' },
    { key: 'surname', title: ['Surname'], type: BasicTextComponent, show: true, columClass: 'flex-2' },
    { key: 'office', title: ['City'], type: BasicTextComponent, show: true, columClass: 'flex-2' },
    { key: 'birtday', title: ['Name'], type: BasicTextComponent, show: true, columClass: 'flex-2' },
    { key: 'phone', title: ['Phone'], type: BasicTextComponent, show: true, columClass: 'flex-2' },
    {
      key: 'tags',
      title: ['Tags'],
      type: ActionComponent,
      function: (item: any) => [() => this.isVisible(item), () => this.openDialog()],
      show: true,
      columClass: 'flex-2',
    },
  ]

  employeeData: EmployeeInterface[] = [
    {name: 'Ojars', surname: 'Gundejko', office: 'Tallinn', birtday: '12.03.2001', phone: '20202020'},
    {name: 'Viktor', surname: 'Nices', office: 'Riga', birtday: '31.10.2005', phone: '29102312'},
    {name: 'Ojars', surname: 'Ozolonis', office: 'Vilnus', birtday: '11.02.1993', phone: '31231233'},
    {name: 'Elena', surname: 'Nices', office: 'Riga', birtday: '31.05.1994', phone: '83817231'},
    {name: 'Ojars', surname: 'Palmvs', office: 'Tallinn', birtday: '13.03.2001', phone: '83861233'},
    {name: 'Robin', surname: 'Draugi', office: 'Tallinn', birtday: '26.01.1994', phone: '30102323'},
    {name: 'Ojars', surname: 'Nices', office: 'Riga', birtday: '13.08.1895', phone: '36772733'},
    {name: 'Olof', surname: 'Meister', office: 'Riga', birtday: '07.03.1977', phone: '03030212'},
  ];

  filterConfig = {
    filters: [
      { id: 'name', title: 'Name', query: { type: 'string', path: 'name', combination: 'or' } },
      { id: 'surname', title: 'Surname', query: { type: 'string', path: 'surname', combination: 'or' } },
      { id: 'office', title: 'Office', query: { type: 'string', path: 'office', combination: 'or' } }
    ],
    needSettings: false
  }

  filterData = {
    office: [{ office: 'Riga' }, { office: 'Tallinn' }, { office: 'Vilnus' }],
  };

  constructor(){
    
  }

  isVisible(item: any) {
    const data = {
      id: item.id,
      isVisible: !item.isVisible,
    };
  }

  openDialog() {
    this.dialog.open(TagsModalComponent, {
      data: {
        data: this.userTags,
      },
    });
  }

}
