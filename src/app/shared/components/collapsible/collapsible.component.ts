import { Component, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { UtilsService } from './../../services/utils.service';


@Component({
    selector: 'cp-collapsible',
    templateUrl: './collapsible.component.html',
    styleUrls: ['./collapsible.component.css'],
})
export class CollapsibleComponent implements OnDestroy {
    public isOpen = false;
    public intervalId?: number;
    public currentHeight?: number;

    @Input() label: string;
    @Input() desc?: string;
    @Input() autoSize = false;
    @Input() header = false;
    @Input() dataHeader: any;

    @ViewChild('content') content: ElementRef<HTMLDivElement>;
    @ViewChild('chevron') chevron: ElementRef<HTMLDivElement>;

    constructor(
        public zone: NgZone,
        public utils: UtilsService,
    ) { }

    public toggle() {
        this.isOpen ? this.close() : this.open();
    }

    public open() {
        if (this.isOpen) {
            return;
        }

        this.chevron.nativeElement.style.transform = 'rotate(180deg)';

        this.isOpen = true;
        this.updateHeight();

        if (this.autoSize) {
            this.clearInterval();

            this.zone.runOutsideAngular(() => {
                this.intervalId = this.utils.getWindow().setInterval(() => this.checkHeight(), 100);
            });
        }
    }

    public close() {
        const content: HTMLDivElement = this.content.nativeElement;
        this.chevron.nativeElement.style.transform = 'rotate(0deg)';
        content.style.maxHeight = '0px';
        this.isOpen = false;
        this.clearInterval();
    }

    public updateHeight() {
        const content: HTMLDivElement = this.content.nativeElement;

        content.style.maxHeight = `${content.scrollHeight}px`;
        this.currentHeight = content.scrollHeight;
    }

    public checkHeight() {
        const content: HTMLDivElement = this.content.nativeElement;

        if (this.currentHeight !== content.scrollHeight) {
            this.zone.run(() => this.updateHeight());
        }
    }

    public clearInterval() {
        if (this.intervalId) {
            this.utils.getWindow().clearInterval(this.intervalId);
        }
    }

    public ngOnDestroy() {
        this.clearInterval();
    }
}
