import { Component, Input } from '@angular/core'

@Component({
  selector: 'cc-form-log',
  templateUrl: './form-log.component.html',
})

export class FormLogComponent {
    @Input() form: string;
    @Input() type: string;
}