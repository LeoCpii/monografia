import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { EstudantePage } from './apresentacao/estudante.page';
import { EstatisticaPage } from './estatisticas/estatistica.page';

const routes: Routes = [
  {
    path: '',
    component: EstudantePage,
    data: { title: 'Estudante' }
  },
  {
    path: 'estatistica',
    component: EstatisticaPage,
    data: { title: 'Estatistica' }
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
    EstatisticaPage
  ],
  providers: [],
})

export class EstudanteRoutingModule { }
