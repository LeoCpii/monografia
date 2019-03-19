import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { EstudantePage } from './estudante.page';

const routes: Routes = [
  {
    path: '',
    component: EstudantePage,
    data: { title: 'Estudante' }
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
  ],
  providers: [],
})
export class EstudanteRoutingModule { }
