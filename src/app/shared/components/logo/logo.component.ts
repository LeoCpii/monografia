import { Component, Input } from '@angular/core';

@Component({
    selector: 'cp-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    @Input() size ?= 'md';
    @Input() corFundo ?= 'branco';
    @Input() inline ?= false;

    public getClass(): string {
        const cssClass: any = {};

        if (this.size === 'sm') {
            cssClass[`cp-logo-${this.size}`] = true;
        } else if (this.size === 'md') {
            cssClass[`cp-logo-${this.size}`] = true;
        } else if (this.size === 'lg') {
            cssClass[`cp-logo-${this.size}`] = true;
        } else if (this.size === 'xl') {
            cssClass[`cp-logo-${this.size}`] = true;
        }

        if (this.inline) {
            cssClass[`cp-logo-inline`] = true;
        }
        
        return cssClass;
    }

    public getStyle(): string {
        let style: string;

        if (this.corFundo === 'branco') {
            style = `./../../../../assets/images/logo/pv_line.svg`;
        } else if (this.corFundo === 'preto') {
            style = `./../../../../assets/images/logo/bv_line.svg`;
        } else if (this.corFundo === 'vermelho') {
            style = `./../../../../assets/images/logo/bp_line.svg`;
        }

        return style;
    }
}
