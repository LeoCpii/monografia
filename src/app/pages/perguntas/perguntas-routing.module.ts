import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from './../../shared/shared.module';
import { PerguntasPage } from './perguntas.page';
import { PerguntasService } from 'src/app/shared/services/business-service/perguntas.service';
import { PerguntasResolver } from './perguntas.resolver';
import { ResultadoService } from 'src/app/shared/services/business-service/resultado.service';
import { SessaoService } from 'src/app/shared/services/business-service/sessao.service';
import { AuthGuardService } from 'src/app/shared/services/auth/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuardService],
    path: '',
    component: PerguntasPage,
    resolve: { data: PerguntasResolver },
    data: { title: 'Perguntas' }
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
    PerguntasPage
  ],
  providers: [
    PerguntasPage,
    PerguntasService,
    PerguntasResolver,
    ResultadoService,
    SessaoService,
    AuthGuardService
  ],
})
export class PerguntasRoutingModule { }
