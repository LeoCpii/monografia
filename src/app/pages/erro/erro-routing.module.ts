import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { Erro403Page } from './erro403/erro403.page';
import { SessaoService } from 'src/app/shared/services/business-service/sessao.service';

const routes: Routes = [
  {
    path: '403/:origem',
    component: Erro403Page,
    data: { title: 'erro-403' }
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
    Erro403Page,
  ],
  providers: [
    SessaoService
  ],
})
export class ErroRoutingModule { }
