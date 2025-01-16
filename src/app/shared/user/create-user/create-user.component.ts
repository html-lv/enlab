import { Component, inject } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { formFieldBuilder } from '../../../core/interfaces/table-interface';
import { EmployeeServiceService } from '../../../core/services/employee/employee-service.service';
import { SelectBoxComponent } from '../../form-builder/types/select-box/select-box.component';
import { TextFieldComponent } from '../../form-builder/types/text-field/text-field.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormBuilderComponent } from "../../form-builder/form-builder.component";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagsService } from '../../../core/services/tag/tags.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [    MatFormFieldModule,
    FormsModule,
    MatButtonModule, 
    FormBuilderComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  dialogRef = inject(MatDialogRef<EditUserComponent>);
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
    private employ: EmployeeServiceService,
    private tag: TagsService
  ){

  }

  ngOnInit(): void {
    this.setFormList()
  }

  setFormList(){
    this.formList = [
      {
        variant: TextFieldComponent,
        label: "id",
        place: 'full',
        formControlName: 'id',
        placeholder: 'id',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Name",
        place: 'full',
        formControlName: 'name',
        placeholder: 'Name',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Surname",
        place: 'full',
        formControlName: 'last_name',
        placeholder: 'Surname',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: SelectBoxComponent,
        label: "City",
        place: 'half-full',
        formControlName: 'office',
        placeholder: 'Office',
        data: this.allCities,
        value: '',
        validators: [Validators.required],
        config: { onlyOne: true },
      },
      {
        variant: TextFieldComponent,
        label: "Phone",
        place: 'full',
        formControlName: 'phone',
        placeholder: 'Phone',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Date of birth",
        place: 'full',
        formControlName: 'birth_day',
        placeholder: 'Birthday format DD.MM.YYYY',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Slug",
        place: 'full',
        formControlName: 'slug',
        placeholder: 'Enter user tag',
        value: '',
        validators: [Validators.required],
      },
      {
        variant: TextFieldComponent,
        label: "Tag id",
        place: 'full',
        formControlName: 'tag_id',
        placeholder: 'Enter user tag id',
        value: '',
        validators: [Validators.required],
      }
    ]
  }


  createUser(data: any) {
    const formValue = data.data;
    if (formValue) {
      const createEmployee = {
        first_name: formValue.name,
        last_name: formValue.last_name,
        office: formValue.office[0].id,
        phone: formValue.phone,
        birth_day: formValue.birth_day,
        id: formValue.id,
      };

      const createTag = {
        id: formValue.tag_id,
        user_id: formValue.id,
        slug: formValue.slug
      }
      
      console.log(createTag)
      this.employ.createEmployee(createEmployee)
        .pipe(takeUntil(this.unsubus$))
        .subscribe({
          next: (res) => {
            console.log("Employee created successfully");
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error("Error creating employee", err);
            alert("Error creating employee: " + err.message);
          },
        });

        this.tag.createTag(createTag)
        .pipe(takeUntil(this.unsubus$))
        .subscribe({
          next: (res) => {
            console.log('Tag was created');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error("Error creating tag", err);
            alert("Error creating tag: " + err.message);
          },
        });

    } else {
      console.warn("Form is invalid");
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
