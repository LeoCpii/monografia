import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-dictlist',
    templateUrl: './dictlist.component.html',
    styleUrls: ['./dictlist.component.css']
})
export class DictlistComponent {

    @Input() data: { [key: string]: string };

    public getLines() {
        return this.data ? Object.keys(this.data).map(key => [key, this.data[key]]) : [];
    }
}
