import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { TableService } from './table.service';
import { Col } from './col';

@Component({
    selector: 'cp-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
    @Input() totalRegistros: 'none' | 'unknown' | 'client' | number = 'none';
    @Input() data: any[];
    @Input() emptyMessage = 'Nenhum resultado';
    @Input() size: string;
    @Input() pageQueryParamName = 'pagina';

    private currentPage = 1;
    private pageSize;
    private word = '';
    public de;
    public ate;
    public filterSize;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public table: TableService
    ) { }

    @ViewChild('select') select: ElementRef<HTMLDivElement>;
    @ViewChild('search') search: ElementRef<HTMLDivElement>;

    ngOnInit() {
        this.pageSize = this.select.nativeElement['value'];

        if (typeof this.totalRegistros === 'string') {
            const hasValidValue = ['none', 'unknown', 'client'].indexOf(this.totalRegistros) >= 0;
            if (!hasValidValue) {
                throw new Error('[cp-table] Invalid totalRegistros prop: ' + this.totalRegistros);
            }
        }

        if (this.totalRegistros === 'client') {
            this.currentPage = 1;
            return;
        }

        const currentPage = parseInt(this.route.snapshot.queryParams[this.pageQueryParamName], 10);
        this.currentPage = isNaN(currentPage) ? 1 : currentPage;

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // tslint:disable-next-line no-shadowed-variable
                const currentPage = parseInt(this.route.snapshot.queryParams[this.pageQueryParamName], 10);
                this.currentPage = isNaN(currentPage) ? 1 : currentPage;
            }
        });
    }

    getColClass(row: any, col: Col): string[] {
        const ret: string[] = [];

        if (col.textAlign === 'left') { ret.push('text-left'); }
        if (col.textAlign === 'center') { ret.push('text-center'); }
        if (col.textAlign === 'right') { ret.push('text-right'); }
        if (col.noWrap) { ret.push('nowrap'); }

        return ret;
    }

    getCols() {
        return this.table.cols;
    }

    getRows() {
        if (this.totalRegistros === 'client') {
            const pageSizeNumber: number = parseInt(this.pageSize);

            this.de = ((this.currentPage - 1) * pageSizeNumber);
            this.ate = (this.de + pageSizeNumber);

            const filter = this.filter();

            if (filter) {
                if (filter.length < this.ate) {
                    this.ate = filter.length;
                }
                this.filterSize = filter.length;
                const data = filter.slice(this.de, this.ate);
                return data;
            } else {
                const data = this.data.slice(this.de, this.ate);
                return data;
            }
        }
        return this.data;
    }

    public getClass(): string {
        const cssClass: any = {};

        if (this.size) {
            cssClass[`table-${this.size}`] = true;
        }

        return cssClass;
    }

    hasMoreToLoad() {
        return this.data.length === this.pageSize;
    }

    shouldDisplayStartPage() {
        return false;
    }

    shouldDisplayBeforePage() {
        return this.getCurrentPage() > 1;
    }

    shouldDisplayNextPage() {
        if (this.totalRegistros === 'client') {
            return this.currentPage < this.getMaxPage();
        }

        return this.hasMoreToLoad();
    }

    shouldDisplayLastPage() {
        return false;
    }

    getCurrentPage() {
        return this.currentPage <= 0 ? 1 : this.currentPage;
    }

    goToBeforePage(ev: Event) {
        let page = this.getCurrentPage() - 1;
        if (page <= 0) {
            page = 1;
        }
        this.goToPage(ev, page);
    }

    goToNextPage(ev: Event) {
        let page = this.getCurrentPage() + 1;
        if (page > this.getMaxPage()) {
            page = this.getMaxPage();
        }

        this.goToPage(ev, page);
    }

    goToPage(ev: Event, pageNumber: number) {
        ev.preventDefault();

        if (this.totalRegistros === 'client') {
            this.currentPage = pageNumber;
            return;
        }

        const queryParams = {
            ...this.route.snapshot.queryParams,
            [this.pageQueryParamName]: pageNumber,
        };

        this.router.navigate([], { relativeTo: this.route, queryParams });
    }

    getPages() {
        if (typeof this.totalRegistros === 'string' && this.totalRegistros !== 'client') {
            return [];
        }

        const number = this.getCurrentPage();
        const pages = [number];
        const maxPages = this.getMaxPage();
        let budget = 4;

        for (let i = 1; i <= 4; i++) {
            if (budget === 0) { break; }

            if ((number - i) > 0) {
                pages.unshift(number - i);
                budget--;
            }

            if (budget === 0) { break; }

            if ((number + i) <= maxPages) {
                pages.push(number + i);
                budget--;
            }
        }

        return pages;
    }

    getMaxPage() {
        let totalRegistros: number;

        if (typeof this.totalRegistros === 'string') {
            if (this.totalRegistros === 'client') {
                const filtro = this.filter();
                if (filtro) {
                    totalRegistros = filtro.length;
                } else {
                    totalRegistros = this.data.length;
                }
            } else {
                return Infinity;
            }
        } else {
            totalRegistros = this.totalRegistros;
        }

        return Math.ceil(totalRegistros / this.pageSize);
    }

    getTotalRegistros(): number {
        if (this.totalRegistros === 'client') {
            return this.data.length;
        }

        return this.totalRegistros as number;
    }

    reaload() {
        this.word = '';
    }

    filter() {
        const word = this.search.nativeElement['value'];
        const linhasFiltradas = [];
        if (word) {
            this.data.forEach(result => {
                // tslint:disable-next-line:forin
                for (let prop in result) {
                    if (result[prop].toString().includes(word)) {
                        linhasFiltradas.push(result);
                    }
                }
            });
            return linhasFiltradas;
            // return this.linhasFiltradas;
        } else {
            return;
        }

    }
}