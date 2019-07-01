import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormatterService } from 'src/app/shared/services/formatter.service';

@Component({
    selector: 'profissao-fragment',
    templateUrl: './profissao.fragment.html',
    // styleUrls: ['./profissao.fragment.css']
})

export class ProfissaoFragment implements OnInit {

    @Input() data: any;

    constructor(private formatter: FormatterService) { }

    @ViewChild('oquee') oquee: ElementRef<HTMLDivElement>;
    @ViewChild('oquefaz') oquefaz: ElementRef<HTMLDivElement>;

    public dictListValue: any;

    public retornaUrlVideo(id: string) {
        return `https://www.youtube.com/embed/${id}?rel=0`;
    }

    ngOnInit() {
        console.log(this.data.description);
        this.dictListValue = {
            'Desenvolvedor Sênior': this.formatter.currency(this.data.description.salarios.senior),
            'Desenvolvedor Pleno': this.formatter.currency(this.data.description.salarios.pleno),
            'Desenvolvedor Junior': this.formatter.currency(this.data.description.salarios.junior),
            'Desenvolvedor Trainee': this.formatter.currency(this.data.description.salarios.trainee),
            'Estagiário': this.formatter.currency(this.data.description.salarios.estagiario),
        };

        this.oquee.nativeElement.innerHTML = this.data.description.descricao.oQueEh;
        this.oquefaz.nativeElement.innerHTML = this.data.description.descricao.oQueFaz;
    }
}
