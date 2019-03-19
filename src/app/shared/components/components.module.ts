import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';
import { ChartsModule } from 'ng2-charts';

import { TitlePageComponent } from './title-page/title-page.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { ButtonComponent } from './button/button.component';
import { ButtonStyleComponent } from './button-style/button-style.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { ItemComponent } from './item/item.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownContentComponent } from './dropdown/dropdown-content/dropdown-content.component';
import { TableComponent } from './table/table.component';
import { TableColComponent } from './table/table-col.component';
import { TableColCheckBoxButton } from './table/table-col-checkbox.component';
import { TableTmplColComponent } from './table/table-col-tmpl.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { NavTabHeaderComponent } from './nav-tab/nav-tab-header/nav-tab-header.component';
import { DictlistComponent } from './dictlist/dictlist.component';
import { FieldComponent } from './field/field.component';
import { FormComponent } from './form/form.component';
import { FormLogComponent } from './form-log/form.log.component';
import { FieldRadioComponent } from './field-radio/field-radio.component';
import { FieldCheckboxComponent } from './field-checkbox/field-checkbox.component';
import { ChartComponent } from './charts/chart.component';
import { FieldRangeComponent } from './field-range/field-range.component';
import { FieldSelectComponent } from './field-select/field-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxMaskModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        TitlePageComponent,
        TextComponent,
        TitleComponent,
        ButtonComponent,
        ButtonStyleComponent,
        ActionButtonComponent,
        CollapsibleComponent,
        ItemComponent,
        AlertComponent,
        DropdownComponent,
        DropdownContentComponent,
        TableComponent,
        TableColComponent,
        TableColCheckBoxButton,
        TableTmplColComponent,
        NavTabComponent,
        NavTabHeaderComponent,
        DictlistComponent,
        FormComponent,
        FieldComponent,
        FormLogComponent,
        FieldRadioComponent,
        FieldCheckboxComponent,
        ChartComponent,
        FieldRangeComponent,
        FieldSelectComponent,
    ],
    exports: [
        TitlePageComponent,
        TextComponent,
        TitleComponent,
        ButtonComponent,
        ButtonStyleComponent,
        ActionButtonComponent,
        CollapsibleComponent,
        ItemComponent,
        AlertComponent,
        DropdownComponent,
        DropdownContentComponent,
        TableComponent,
        TableColComponent,
        TableColCheckBoxButton,
        TableTmplColComponent,
        NavTabComponent,
        NavTabHeaderComponent,
        DictlistComponent,
        FormComponent,
        FieldComponent,
        FormLogComponent,
        FieldRadioComponent,
        FieldCheckboxComponent,
        ChartComponent,
        FieldRangeComponent,
        FieldSelectComponent,
    ],
})
export class ComponentsModule { }
