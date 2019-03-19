import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { ProfissionalPage } from './profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalPage,
    data: { title: 'Profissional' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    ProfissionalPage,
  ],
  providers: [],
})
export class ProfissionalRoutingModule { }
