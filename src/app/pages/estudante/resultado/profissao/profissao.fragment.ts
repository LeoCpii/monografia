import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormatterService } from 'src/app/shared/services/formatter.service';

@Component({
    selector: 'profissao-fragment',
    templateUrl: './profissao.fragment.html',
    // styleUrls: ['./profissao.fragment.css']
})

export class ProfissaoFragment implements OnInit {

    @Input() data: Profissao;

    constructor(private formatter: FormatterService) { }

    @ViewChild('oquee') oquee: ElementRef<HTMLDivElement>;
    @ViewChild('oquefaz') oquefaz: ElementRef<HTMLDivElement>;

    public dictListValue: any;

    public retornaUrlVideo(id: string) {
        return `https://www.youtube.com/embed/${id}?rel=0`;
    }

    ngOnInit() {
        // this.dictListValue = {
        //     'Desenvolvedor Sênior': this.formatter.currency(this.data.salario.senior),
        //     'Desenvolvedor Pleno': this.formatter.currency(this.data.salario.pleno),
        //     'Desenvolvedor Junior': this.formatter.currency(this.data.salario.junior),
        //     'Desenvolvedor Trainee': this.formatter.currency(this.data.salario.trainee),
        //     'Estagiário': this.formatter.currency(this.data.salario.estagiario),
        // };

        // this.oquee.nativeElement.innerHTML = this.data.descricao.oquee;
        // this.oquefaz.nativeElement.innerHTML = this.data.descricao.oquefaz;
    }
}
