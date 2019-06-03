import { Component, Input } from '@angular/core'

@Component({
  selector: 'cp-info-box-simple',
  templateUrl: './info-box-simple.component.html',
  styleUrls: ['./info-box-simple.component.css']
})

export class InfoBoxSimpleComponent {
    @Input() label?: string;
    @Input() value?: string;
    @Input() percent?: string;
    @Input() bg?: string = '#17a2b8';
    @Input() icon?: string = '';

    public getClassIcon(): string {
        const cssClass: any = {};

        cssClass[`${this.icon}`] = true;

        return cssClass;
    }
}
