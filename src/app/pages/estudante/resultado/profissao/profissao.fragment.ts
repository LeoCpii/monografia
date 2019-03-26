import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormatterService } from 'src/app/shared/services/formatter.service';

@Component({
    selector: 'profissao-fragment',
    templateUrl: './profissao.fragment.html',
    // styleUrls: ['./profissao.fragment.css']
})

export class ProfissaoFragment implements OnInit {

    @Input() data: string;

    constructor(private formatter: FormatterService) { }

    public dictListValue = {
        'Desenvolvedor Sênior': this.formatter.currency(4730.50),
        'Desenvolvedor Pleno': this.formatter.currency(4730.50),
        'Desenvolvedor Junior': this.formatter.currency(4730.50),
        'Desenvolvedor Trainee': this.formatter.currency(4730.50),
        'Estagiário': this.formatter.currency(3099.26),
      };

    ngOnInit() { }
}
