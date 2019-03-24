import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from './../../shared/shared.module';
import { ProfissionalFormPage } from './formulario/profissional-form.page';
import { ProfissionalGraficoPage } from './grafico/profissional-grafico.page';
import { AgradecimentosPage } from './agradecimento/agradecimento.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalFormPage,
    data: { title: 'Profissional' }
  },
  {
    path: 'grafico',
    component: ProfissionalGraficoPage,
    data: { title: 'Grafico' }
  },
  {
    path: 'agradecimentos',
    component: AgradecimentosPage,
    data: { title: 'Agradecimentos' }
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
    ProfissionalFormPage,
    ProfissionalGraficoPage,
    AgradecimentosPage
  ],
  providers: [
    ProfissionalFormPage,
    ProfissionalGraficoPage,
    AgradecimentosPage
  ],
})
export class ProfissionalRoutingModule { }
