import { Component, Input } from '@angular/core'

@Component({
  selector: 'cc-button-style',
  templateUrl: './button-style.component.html',
  styleUrls: ['./button-style.component.css']
})

export class ButtonStyleComponent {
    @Input() label: string;
    @Input() type: string;

  public getClass(): string {
    const cssClass: any = {};

    if (this.type === 'press') {
      cssClass[`cc-btn-press`] = true;
    } else if (this.type === 'transition') {
      cssClass[`cc-btn-transition`] = true;
    } else if (this.type === 'line') {
      cssClass[`cc-btn-line`] = true;
      cssClass[`cc-btn-line-effect`] = true;
      cssClass[`shadow-sm`] = true;
    }

    return cssClass;
  }
}
