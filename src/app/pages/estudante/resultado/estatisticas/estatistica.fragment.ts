import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'estatistica-fragment',
    templateUrl: './estatistica.fragment.html',
    // styleUrls: ['./estatistica.fragment.css']
})

export class EstatisticaFragment implements OnInit {

    @Input() data: string;

    constructor() { }

    ngOnInit() {
        console.log(this.data)
    }
}
