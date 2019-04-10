import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { donutPieChart } from "./../../../shared/models/elements";
import { UtilsService } from 'src/app/shared/services/utils.service';

export interface IResultado {
    profissao: Profissao;
}

@Component({
    selector: 'resultado-page',
    templateUrl: './resultado.page.html',
    styleUrls: ['./resultado.page.css']
})

export class ResultadoPage implements OnInit {
    public data: IResultado;

    constructor(
        private router: Router,
        private utils: UtilsService,
        private route: ActivatedRoute,
    ) { }

    public dunotChart = donutPieChart;

    public ir() {
        this.router.navigate(['perguntas', 'estudante']);
    }

    ngOnInit() {
        this.data = this.route.snapshot.data['data'];
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.data = this.route.snapshot.data['data'];
            }
        });
    }

    scroll(e: HTMLElement) {
        this.utils.scroll(e);
    }
}
