import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { ProfissionalFormPage } from './formulario/profissional-form.page';
import { ProfissionalFormResolver } from './formulario/profissional-form.resolver';

import { ProfissionalGraficoPage } from './grafico/profissional-grafico.page';
import { AgradecimentosPage } from './agradecimento/agradecimento.page';
import { ProfissionalAgradecimentoResolver } from './agradecimento/agradecimento.resolver';

import { SharedModule } from './../../shared/shared.module';
import { ProfissionalService } from './profissional.service';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalFormPage,
    resolve: { data: ProfissionalFormResolver },
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
    resolve: { data: ProfissionalAgradecimentoResolver },
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
    AgradecimentosPage,
    ProfissionalFormResolver,
    ProfissionalAgradecimentoResolver,
    ProfissionalService
  ],
})
export class ProfissionalRoutingModule { }
