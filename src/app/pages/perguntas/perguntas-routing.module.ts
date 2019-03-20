import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from './../../shared/shared.module';
import { PerguntasPage } from './perguntas.page';

const routes: Routes = [
  {
    path: '',
    component: PerguntasPage,
    data: { title: 'Perguntas' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  exports: [RouterModule],
  declarations: [
    PerguntasPage
  ],
  providers: [
    PerguntasPage
  ],
})
export class PerguntasRoutingModule { }
