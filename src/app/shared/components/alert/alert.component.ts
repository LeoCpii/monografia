import { Component, Input } from '@angular/core'

@Component({
  selector: 'cc-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent {
    @Input() label: string;
    @Input() type: string;
    @Input() title?: string;

    public getClass(): string {
        const cssClass: any = {};

        if (this.type) {
            cssClass[`alert-${this.type}`] = true;
        } else {
            cssClass[`alert-primary`] = true;
        }

        return cssClass;
    }

    public getClassIcon(): string{
        const cssClass: any = {};

        if (this.type === 'warning') {
            cssClass[`fa-exclamation-triangle`] = true;
        } else if (this.type === 'danger'){
            cssClass[`fa-times-circle`] = true;
        } else if (this.type === 'success'){
            cssClass[`fa-thumbs-up`] = true;
        } else {
            cssClass[`fa-bell`] = true;
        }

        return cssClass;
    }
}
