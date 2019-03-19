import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { BoasVindasPage } from './boas-vindas.page';

const routes: Routes = [
  {
    path: '',
    component: BoasVindasPage,
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
    BoasVindasPage,
  ],
  providers: [],
})
export class BoasVindasRoutingModule { }
