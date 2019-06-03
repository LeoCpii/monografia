import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})

export class TitlePageComponent {
  @Input() section?: string;
  @Input() size?: string;
  @Input() colorSection?: string;

  public getColor(): string {
    const cssClass: any = {};

    if (this.colorSection === 'white') {
      cssClass[`text-white`] = true;
    } else {
      cssClass[`text-black-50`] = true;
    }

    return cssClass;
  }

  public getClass(): string {
    const cssClass: any = {};

    if (this.size) {
      cssClass[`display-${this.size}`] = true;
    } else {
      cssClass[`display-4`] = true;
    }

    return cssClass;
  }
}
