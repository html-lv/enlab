import { ComponentType } from "@angular/cdk/portal";
import { BasicTextComponent } from "../../shared/table/table-template/column-type/basic-text/basic-text.component";
import { DateComponent } from "../../shared/table/table-template/column-type/date/date.component";
import { ActionComponent } from "../../shared/table/table-template/column-type/action/action.component";
import { ValidatorFn } from "@angular/forms";
import { TextFieldComponent } from "../../shared/form-builder/types/text-field/text-field.component";
import { TextAreaComponent } from "../../shared/form-builder/types/text-area/text-area.component";
import { UserActionComponent } from "../../shared/table/table-template/column-type/user-action/user-action.component";
import { SelectBoxComponent } from "../../shared/form-builder/types/select-box/select-box.component";

export interface TableConfig {
    key: string;
    title: string[];
    type: ComponentType<
        BasicTextComponent |
        ActionComponent |
        DateComponent |
        UserActionComponent | 
        SelectBoxComponent
    >;
    maxWight?: string;
    hyphen?: string;
    show: boolean;
    columClass: string;
    function?: (item: any) => (() => void)[];
}

export interface formFieldBuilder {
    variant: ComponentType<
      | TextFieldComponent
      | TextAreaComponent
      | SelectBoxComponent
    >;
    label: string;
    place: string;
    formControlName: string;
    inputInfo?: string;
    value: any;
    placeholder?: string;
    validators: ValidatorFn[];
    data?: any[];
    config?: any;
  }
