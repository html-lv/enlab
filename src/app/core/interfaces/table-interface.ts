import { ComponentType } from "@angular/cdk/portal";
import { BasicTextComponent } from "../../shared/table/table-template/column-type/basic-text/basic-text.component";

export interface TableConfig {
    key: string;
    title: string[];
    type: ComponentType<
        BasicTextComponent
    >;
    maxWight?: string;
    hyphen?: string;
    show: boolean;
    columClass: string;
    function?: (item: any) => (() => void)[];
}
