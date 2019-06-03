import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cp-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

    @Input() formGroup: FormGroup;
    @Input() label: string;
    @Input() inline ?= false;

}
