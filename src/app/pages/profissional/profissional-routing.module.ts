import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { ProfissionalFormPage } from './formulario/profissional-form.page';
import { ProfissionalFormResolver } from './formulario/profissional-form.resolver';

import { ProfissionalGraficoPage } from './grafico/profissional-grafico.page';
import { ProfissionalGraficoResolver } from './grafico/profissional-grafico.resolver';

import { AgradecimentosPage } from './agradecimento/agradecimento.page';
import { ProfissionalAgradecimentoResolver } from './agradecimento/agradecimento.resolver';

import { SharedModule } from './../../shared/shared.module';
import { ResultadoService } from 'src/app/shared/services/business-service/resultado.service';
import { ProfissionalService } from './../../shared/services/business-service/profissional.service';
import { ProfissaoService } from 'src/app/shared/services/business-service/profissao.service';
import { NiveisService } from 'src/app/shared/services/business-service/nivel.service';
import { SessaoService } from 'src/app/shared/services/business-service/sessao.service';
import { AuthGuardService } from 'src/app/shared/services/auth/auth.guard';
import { RevisitaPage } from './revisita/revisita.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalFormPage,
    resolve: { data: ProfissionalFormResolver },
    data: { title: 'Profissional' }
  },
  {
    canActivate: [AuthGuardService],
    path: 'grafico',
    component: ProfissionalGraficoPage,
    resolve: { data: ProfissionalGraficoResolver },
    data: { title: 'Grafico' }
  },
  {
    canActivate: [AuthGuardService],
    path: 'agradecimentos',
    component: AgradecimentosPage,
    resolve: { data: ProfissionalAgradecimentoResolver },
    data: { title: 'Agradecimentos' }
  },
  {
    path: 'revisita',
    component: RevisitaPage,
    data: { title: 'Revisita' }
  }
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
    AgradecimentosPage,
    RevisitaPage,
  ],
  providers: [
    ProfissionalFormPage,
    ProfissionalGraficoPage,
    AgradecimentosPage,
    RevisitaPage,
    ProfissionalFormResolver,
    ProfissionalAgradecimentoResolver,
    ProfissionalGraficoResolver,
    ResultadoService,
    ProfissionalService,
    ProfissaoService,
    NiveisService,
    SessaoService,
    AuthGuardService,
  ],
})
export class ProfissionalRoutingModule { }
