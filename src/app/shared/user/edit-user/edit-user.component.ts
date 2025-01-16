import { Component, inject } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilderComponent } from "../../form-builder/form-builder.component";
import { formFieldBuilder } from '../../../core/interfaces/table-interface';
import { TextFieldComponent } from '../../form-builder/types/text-field/text-field.component';
import { EmployeeServiceService } from '../../../core/services/employee/employee-service.service';
import { SelectBoxComponent } from '../../form-builder/types/select-box/select-box.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule, 
    FormBuilderComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  dialogRef = inject(MatDialogRef<EditUserComponent>);
  data = inject(MAT_DIALOG_DATA);
  resetTrigger$ = new Subject<void>();
  saveTrigger$ = new Subject<void>();
  formList: formFieldBuilder[] = [];
  unsubus$: Subject<boolean> = new Subject();
  currentUser: any
  allCities: any[] = [
    { id: 'Tallinn', title: 'Tallinn' },
    { id: 'Riga', title: 'Riga' },
    { id: 'Vilnus', title: 'Vilnus' },
  ];

  constructor(
    private employ: EmployeeServiceService
  ){

  }

  ngOnInit(): void {
    this.currentUser = this.data.employee
    console.log(this.currentUser)
    this.setFormList();
  }

  setFormList(){
    this.formList = [
      {
        variant: TextFieldComponent,
        label: "Name",
        place: 'full',
        formControlName: 'name',
        placeholder: 'first_name',
        value: this.currentUser.first_name || '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Surname",
        place: 'full',
        formControlName: 'last_name',
        placeholder: 'surname',
        value: this.currentUser.last_name || '',
        validators: [Validators.required],
      },
      {
        variant: SelectBoxComponent,
        label: "City",
        place: 'half-full',
        formControlName: 'office',
        placeholder: 'office',
        data: this.allCities,
        value: this.currentUser.office || '',
        validators: [Validators.required],
        config: { onlyOne: true },
      },
      {
        variant: TextFieldComponent,
        label: "Phone",
        place: 'full',
        formControlName: 'phone',
        placeholder: 'phone',
        value: this.currentUser.phone || '',
        validators: [Validators.required],
      }
    ]
  }


  updateData(data: any) {
    const formValue = data.data;
    if (formValue) {
      const updatedEmployee = {
        first_name: formValue.name,
        last_name: formValue.last_name,
        office: formValue.office[0].id,
        phone: formValue.phone,
      };
      this.employ.updateEmployee(this.currentUser.id, updatedEmployee)
      .pipe(takeUntil(this.unsubus$))
      .subscribe({
        next: (res) => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
  } else {
    console.warn('Form is invalid');
  }
  }

  resetTab() {
    this.resetTrigger$.next();
  }

  saveAllTabs() {
    this.saveTrigger$.next();
    
  }

  ngOnDestroy(): void {
    this.unsubus$.next(true);
    this.unsubus$.complete();
  }
}
