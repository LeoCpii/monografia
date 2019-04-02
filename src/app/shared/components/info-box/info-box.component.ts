import { Component, Input } from '@angular/core'

@Component({
  selector: 'cc-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})

export class InfoBoxComponent {
    @Input() title?: string;
    @Input() text?: string;
    @Input() desc?: string;
    @Input() bgColor?: string;
    @Input() percent?: string;
    @Input() icon?: string;

    public getClassIcon(): string{
        const cssClass: any = {};


        cssClass[`${this.icon}`] = true;


        return cssClass;
    }
}
