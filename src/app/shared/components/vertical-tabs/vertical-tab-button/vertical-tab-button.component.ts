import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Output, EventEmitter
} from '@angular/core';


import { VerticalTabComponent } from '../vertical-tab.component.component';

@Component({
    selector: 'cp-vertical-tab-button',
    templateUrl: './vertical-tab-button.component.html',
    styleUrls: ['./vertical-tab-button.component.css'],
})
export class VerticalTabButtonComponent implements AfterContentInit {

    @ContentChildren(VerticalTabComponent) tabs: QueryList<VerticalTabComponent>;
    @Output() tab = new EventEmitter();

    ngAfterContentInit() {
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab) {

        if (!tab.disabled){
            this.tabs.toArray().forEach(tab => tab.active = false);
            tab.active = true;
            this.tab.emit(tab.title);
        }
    }
}
