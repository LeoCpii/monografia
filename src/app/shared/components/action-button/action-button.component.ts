import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cc-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['../button/button.component.css', './action-button.component.css'],
})
export class ActionButtonComponent {

    @Input() label: string;
    @Input() isLoading = false;
    @Input() type: 'button' | 'submit' = 'button';
    @Input() disabled = false;
    @Input('styleButton') styleButton?: string;
    @Input('size') size?: string;
    @Input('labelLoading') labelLoading: string;
    @Input() block: boolean = false;

    @Output() click = new EventEmitter();

    public onClick() {
        if (!this.isLoading && !this.disabled) {
            this.click.emit();
        }
    }

    public getClass(): string {
        const cssClass: any = {};

        if (this.styleButton) {
            cssClass[`cc-btn-${this.styleButton}`] = true;
        } else {
            cssClass[`cc-btn-primary`] = true;
        }

        if(this.size === 'lg'){
            cssClass[`btn-lg`] = true;
        } else if(this.size === 'sm'){
            cssClass[`btn-sm`] = true;
        }

        if (this.block) {
            cssClass[`btn-block`] = true;
        }

        return cssClass;
    }

}
