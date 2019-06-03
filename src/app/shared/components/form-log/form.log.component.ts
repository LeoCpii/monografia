import { Component, Input } from '@angular/core'

@Component({
  selector: 'cp-form-log',
  templateUrl: './form-log.component.html',
})

export class FormLogComponent {
  @Input() form: Formlog;
  @Input() type: string;
}