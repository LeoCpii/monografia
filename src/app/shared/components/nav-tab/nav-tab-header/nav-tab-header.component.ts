import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Output, EventEmitter
} from '@angular/core';


import { NavTabComponent } from '../nav-tab.component';

@Component({
    selector: 'cc-nav-tab-header',
    templateUrl: './nav-tab-header.component.html',
    styleUrls: ['./nav-tab-header.component.css'],
})
export class NavTabHeaderComponent implements AfterContentInit {

    @ContentChildren(NavTabComponent) tabs: QueryList<NavTabComponent>;
    @Output() tab = new EventEmitter();

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter((tab) => tab.active);

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
