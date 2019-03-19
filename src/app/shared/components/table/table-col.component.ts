import { Component, Input, OnInit } from '@angular/core';
import { TableService } from './table.service';
import { FormatterService } from '../../services/formatter.service';

@Component({
    selector: 'cc-table-col',
    template: '',
})
export class TableColComponent implements OnInit {
    @Input() header: string;
    @Input() prop: string;
    @Input() width: number;
    @Input() format: string = 'text';
    @Input() textAlign: 'left' | 'center' | 'right' = 'left';
    @Input() noWrap: boolean = false;

    public constructor(
        public parent: TableService,
        public formatter: FormatterService,
    ) {}

    public ngOnInit() {
        if (typeof this.header !== 'string') {
            throw new Error('[cc-table-col] header is mandatory');
        }

        if (!this.prop) {
            throw new Error('[cc-table-col] prop is mandatory');
        }

        this.parent.addCol({
            header: this.header,
            fn: this.getFormatter(),
            width: this.width,
            textAlign: this.textAlign,
            noWrap: this.noWrap
        });
    }

    public getFormatter(): (row: any) => string {
        switch (this.format) {
            case 'text':
                return (row: any) => this.get(row, this.prop);
            case 'currency':
                return (row: any) => this.formatter.currency(this.get(row, this.prop));
            case 'date':
                return (row: any) => this.formatter.date(this.get(row, this.prop));
            case 'datetime':
                return (row: any) => this.formatter.datetime(this.get(row, this.prop));
            case 'phone':
                return (row: any) => this.formatter.phoneFormat(this.get(row, this.prop));
        }

        throw new Error(`[cc-table-col] invalid type "${this.format}"`);
    }

    public get(obj: object, path: string): string {
        const index = path.split('.');
        let value = obj || {};

        let i: number;
        for (i = 0; i < index.length; i++) {
            value = value[index[i]];

            if (value === null || typeof value !== 'object') {
                break;
            }
        }

        if (index.length - 1 === i) {
            return (value || '').toString();
        } else {
            return undefined;
        }
    }
}
