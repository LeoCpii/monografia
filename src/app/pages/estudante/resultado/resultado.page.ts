import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { donutPieChart } from "./../../../shared/models/elements";
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
    selector: 'resultado-page',
    templateUrl: './resultado.page.html',
    styleUrls: ['./resultado.page.css']
})

export class ResultadoPage implements OnInit {

    constructor(
        private router: Router,
        private utils: UtilsService
        ) { }

    public dunotChart = donutPieChart;

    public profissao = 'Front-End';

    public desc = `O desenvolvedor front-end é responsável por “dar vida” à interface. Trabalha com a parte da
    aplicação que interage diretamente com o usuário. Por isso, é importante que esse desenvolvedor
    também se preocupe com a experiência do usuário.

    Na parte de estudo, este profissional foca em HTML (linguagem de marcação), CSS (linguagem de
    estilo) e JavaScript (linguagem de script/programação).

    Nos últimos anos, esta área também viu a introdução de outras linguagens e pseudo-linguagens,
    como TypeScript e CoffeeScript, que podem ser utilizadas de acordo com as necessidades da
    aplicação.

    Caso esteja interessado em ingressar nesta área, um estudo complementar como teoria das cores e
    design gráfico, podem ser diferenciais.

    É comum alguns profissionais de front-end trabalharem mais com a parte “criativa” e “artística”
    da aplicação. Assim como também há os que possuem um perfil mais voltado ao back-end, mesmo
    atuando como front-end. Esses possuem mais familiaridade com programação e suas nuances. Um tipo
    de perfil não invalida o outro.`;

    public ir() {
        this.router.navigate(['perguntas', 'estudante']);
    }

    ngOnInit() { }

    scroll(e: HTMLElement) {
        this.utils.scroll(e);
      }
}
