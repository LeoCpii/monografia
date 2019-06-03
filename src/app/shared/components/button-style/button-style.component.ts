import { Component, Input } from '@angular/core'

@Component({
  selector: 'cp-button-style',
  templateUrl: './button-style.component.html',
  styleUrls: ['./button-style.component.css']
})

export class ButtonStyleComponent {
    @Input() label: string;
    @Input() type: string;

  public getClass(): string {
    const cssClass: any = {};

    if (this.type === 'press') {
      cssClass[`cp-btn-press`] = true;
    } else if (this.type === 'transition') {
      cssClass[`cp-btn-transition`] = true;
    } else if (this.type === 'line') {
      cssClass[`cp-btn-line`] = true;
      cssClass[`cp-btn-line-effect`] = true;
      cssClass[`shadow-sm`] = true;
    }

    return cssClass;
  }
}
