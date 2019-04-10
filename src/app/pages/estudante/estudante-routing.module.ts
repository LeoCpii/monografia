import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { EstudantePage } from './apresentacao/estudante.page';
import { ResultadoPage } from './resultado/resultado.page';
import { ProfissaoFragment } from './resultado/profissao/profissao.fragment';
import { EstatisticaFragment } from './resultado/estatisticas/estatistica.fragment';

import { ResultadoResolver } from './resultado/resultado.resolver';
import { ProfissaoService } from 'src/app/shared/services/business-service/profissao.service';

const routes: Routes = [
  {
    path: '',
    component: EstudantePage,
    data: { title: 'Estudante' }
  },
  {
    path: 'resultado',
    component: ResultadoPage,
    resolve: { data: ResultadoResolver },
    data: { title: 'Resultado' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    EstudantePage,
    ResultadoPage,
    ProfissaoFragment,
    EstatisticaFragment,
  ],
  providers: [
    ResultadoResolver,
    ProfissaoService
  ],
})

export class EstudanteRoutingModule { }
