import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.css']
})

export class VerticalTabComponent {

    @Input('tabTitle') title: string;
    @Input() active = false;
    @Input() disabled: boolean = false;

}
