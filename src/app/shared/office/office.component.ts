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
import { MatIconModule } from '@angular/material/icon';
import { EmployeeServiceService } from '../../core/services/employee/employee-service.service';
import { Subject, takeUntil } from 'rxjs';
import { DateComponent } from '../table/table-template/column-type/date/date.component';
import { EditUserComponent } from '../user/edit-user/edit-user.component';
import { UserActionComponent } from '../table/table-template/column-type/user-action/user-action.component';
import { CreateUserComponent } from '../user/create-user/create-user.component';

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
    { 
      key: 'first_name', title: ['Name'], 
      type: UserActionComponent, 
      function: (item: any) => [() => this.isVisible(item), () => this.editUser(item)], 
      show: true, 
      columClass: 'flex-1' 
    },
    { key: 'last_name', title: ['Surname'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'office', title: ['City'], type: BasicTextComponent, show: true, columClass: 'flex-1' },
    { key: 'birth_day', title: ['Birthday'], type: DateComponent, show: true, columClass: 'flex-1' },
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

  employeeData: EmployeeInterface[] = [];
  paginatedData: any[] = [];

  filterConfig = {
    filters: [
      { id: 'office', title: 'Office', query: { type: 'string', path: 'office', combination: 'or' } }
    ],
    needSettings: false,
    addNewTableItem: { need: true, newItemName: '+ Add Employee', function: () => this.addUserModal() },
  }

  filterData = {
    office: [{ office: 'Riga' }, { office: 'Tallinn' }, { office: 'Vilnus' }],
  };

  constructor(
    private employ: EmployeeServiceService,
  ){
  }

  ngOnInit(): void {
    this.getEmployee()  
    
  }

  getEmployee(){
    this.employ.getEmployees()
    .pipe(takeUntil(this.unsubus$))
    .subscribe(res => {
      this.employeeData = res;
      this.paginateData();
    })
  }

  getFIlteredEmployee(filters: string) {
    this.employ.getEmployees(filters) 
      .pipe(takeUntil(this.unsubus$))
      .subscribe((res) => {
        this.employeeData = res;  
        this.paginateData();
      });
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

  editUser(employee: EmployeeInterface) {
    this.dialog.open(EditUserComponent, {
      data: { employee },
      width: '550px',
    });
  }

  addUserModal(){
    this.dialog.open(CreateUserComponent, {
      width: '550px',
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
