import { Component, Input } from '@angular/core';

@Component({
    selector: 'cp-nav-tab',
    templateUrl: './nav-tab.component.html',
    styleUrls: ['./nav-tab.component.css'],
})
export class NavTabComponent {

    @Input('tabTitle') title: string;
    @Input() active = false;
    @Input() disabled: boolean = false;

}