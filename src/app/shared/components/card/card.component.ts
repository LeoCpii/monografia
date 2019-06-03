import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() hover ?= false;

  public getClassHover(): string{
    const cssClass: any = {};

    if (this.hover) {
        cssClass[`hover-card-zoom`] = true;
    }

    return cssClass;
}

}
