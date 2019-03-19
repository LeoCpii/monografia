import { Component, Input, OnInit } from '@angular/core';
import { TableService } from './table.service';
import { Router } from '@angular/router';
import { FormatterService } from './../../services/formatter.service';

export type TmplFn = (row: any) => string;

@Component({
    selector: 'cc-table-tmpl-col',
    template: '',
})
export class TableTmplColComponent implements OnInit {
    @Input() header: string;
    @Input() tmpl: TmplFn | string;
    @Input() width: number;

    public constructor(
        public parent: TableService,
        public router: Router,
        public formatter: FormatterService,
    ) {}

    public ngOnInit() {
        if (!this.header) {
            throw new Error('[cc-table-col] header is mandatory');
        }

        if (!this.tmpl) {
            throw new Error('[cc-table-col] tmpl is mandatory');
        }

        const fn = typeof this.tmpl === 'function'
            ? this.tmpl
            : (row: any) => this.formatter.format(this.tmpl.toString(), row);

        this.parent.addCol({
            header: this.header,
            fn: fn,
            width: this.width,
        });
    }
}
