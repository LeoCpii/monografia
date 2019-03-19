import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TableService } from './table.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'cc-table-col-checkbox',
    template: '',
})
export class TableColCheckBoxButton implements OnInit {
    @Input() header: string;
    @Input() prop: string;
    @Input() width: number;
    @Input() textAlign: 'left' | 'center' | 'right' = 'left';
    @Input() disabled: boolean = false;

    @Output() row = new EventEmitter();

    public constructor(
        public parent: TableService,
        public domSanitizer: DomSanitizer,
    ) {}

    public ngOnInit() {
        if (!this.prop) {
            throw new Error('[cc-table-status-col] prop is mandatory');
        }

        const onClick = (row: object, col: object) => {
            if (this.disabled) {
                return;
            }
            row[this.prop] = !row[this.prop];

            this.row.emit(row);
        };

        this.parent.addCol({
            header: this.header,
            fn: this.getFormatter(),
            width: this.width,
            click: onClick,
            textAlign: this.textAlign,
        });
    }

    public getFormatter(): (row: any) => SafeHtml {
        let cont: number = 0;
        const fn = (row: any) => {
            cont++;
            const isSelected: boolean = row[this.prop];
            return this.domSanitizer.bypassSecurityTrustHtml(
            `
            <div class="custom-control custom-checkbox">
                <input type="checkbox"
                class="custom-control-input"
                id="${cont}" ${isSelected ? `checked='checked'` : ''}
                ${this.disabled ? `disabled` : ''}/>
                <label class="custom-control-label ${this.disabled ? `disabled` : ''}"
                for="${cont}"></label>
            </div>`);
        };

        return fn;
    }
}
