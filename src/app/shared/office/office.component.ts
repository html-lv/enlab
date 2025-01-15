import { Component, ViewChild, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableTemplateComponent } from "../table/table-template/table-template.component";
import { TableConfig } from '../../core/interfaces/table-interface';
import { BasicTextComponent } from '../table/table-template/column-type/basic-text/basic-text.component';
import { EmployeeInterface } from '../../core/interfaces/employee-interface';
import { ActionComponent } from '../table/table-template/column-type/action/action.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagsModalComponent } from '../tagos/tags-modal/tags-modal.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { EmployeeServiceService } from '../../core/services/employee-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [MatTableModule, TableTemplateComponent, MatDialogModule, MatPaginatorModule, MatIconModule],
  templateUrl: './office.component.html',
  styleUrl: './office.component.scss'
})
export class OfficeComponent {
  unsubus$: Subject<boolean> = new Subject();
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialog = inject(MatDialog);
  userTags: any[] = []
  itemsPerPage = 5;
  currentPage = 0;

  employeeTableConfig: TableConfig[] = [
    { key: 'name', title: ['Name'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'surname', title: ['Surname'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'office', title: ['City'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'birtday', title: ['Birthday'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'phone', title: ['Phone'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    {
      key: 'tags',
      title: ['Tags'],
      type: ActionComponent,
      function: (item: any) => [() => this.isVisible(item), () => this.openDialog(item)],
      show: true,
      columClass: 'flex-2',
    },
  ]

  employeeData: EmployeeInterface[] = [
    {name: 'Ojars', surname: 'Gundejko', office: 'Tallinn', birtday: '12.03.2001', phone: '20202020', tags: [
      {slug: 'Salary'}
    ]},
    {name: 'Viktor', surname: 'Nices', office: 'Riga', birtday: '31.10.2005', phone: '29102312', tags: [
      {slug: 'Illness'}
    ]},
    {name: 'Ojars', surname: 'Ozolonis', office: 'Vilnus', birtday: '11.02.1993', phone: '31231233'},
    {name: 'Elena', surname: 'Nices', office: 'Riga', birtday: '31.05.1994', phone: '83817231'},
    {name: 'Ojars', surname: 'Palmvs', office: 'Tallinn', birtday: '13.03.2001', phone: '83861233', tags: [
      {slug: 'Vacation'}
    ]},
    {name: 'Robin', surname: 'Draugi', office: 'Tallinn', birtday: '26.01.1994', phone: '30102323'},
    {name: 'Ojars', surname: 'Nices', office: 'Riga', birtday: '13.08.1895', phone: '36772733', tags: [
      {slug: 'illness'},
      {slug: 'vacations'},
    ]},
    {name: 'Olof', surname: 'Meister', office: 'Riga', birtday: '07.03.1977', phone: '03030212'},
  ];
  paginatedData: any[] = [];

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

  constructor(
    private employ: EmployeeServiceService
  ){
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('edit.svg'));
  }

  ngOnInit(): void {
    this.paginateData();
  }

  getEmployee(){
    this.employ.getEmployees().pipe(takeUntil(this.unsubus$)).subscribe((res) => {
      console.log(res)
    })
  }

  paginateData(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.employeeData.slice(startIndex, endIndex);
  }
  

  ngAfterViewInit(): void {
    this.paginateData();
    this.paginator.page.subscribe((event: PageEvent) => this.onPageChange(event));
  }

  isVisible(item: any) {
    const data = {
      id: item.id,
    };
  }

  openDialog(employee: EmployeeInterface) {
    this.dialog.open(TagsModalComponent, {
      data: { employee },
      width: '350px',
    });
  }
  

  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateData();
  }  

  updateEmployees(filter: any){
    this.employeeData = [];
  }
  
  ngOnDestroy(): void {
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
