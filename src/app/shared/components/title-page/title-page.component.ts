import { Component, Input } from '@angular/core';

@Component({
  selector: 'cc-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})

export class TitlePageComponent {
  @Input() section?: string;
  @Input() size?: string;

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
