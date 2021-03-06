import { Component, Input } from '@angular/core'

@Component({
  selector: 'cp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
    @Input() label: string;
    @Input() type: string;
    @Input() styleButton?: string;
    @Input() size?: string;
    @Input() disabled: boolean = false;
    @Input() block: boolean = false;

    public getClass(): string {
        const cssClass: any = {};

        if (this.styleButton) {
            cssClass[`cp-btn-${this.styleButton}`] = true;
        } else {
            cssClass[`cp-btn-primary`] = true;
        }

        if (this.size === 'lg') {
            cssClass[`btn-lg`] = true;
        } else if(this.size === 'sm') {
            cssClass[`btn-sm`] = true;
        }

        if (this.block) {
            cssClass[`btn-block`] = true;
        }

        if (this.disabled) {
            cssClass['disabled'] = true;
        }

        return cssClass;
    }
}