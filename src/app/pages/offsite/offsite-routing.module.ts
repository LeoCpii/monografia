import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StyleguidePage } from './styleguide/styleguide.page';
import { LoginPage } from './login/login.page';

import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  {
    path: 'styleguide',
    component: StyleguidePage,
    data: { title: 'Styleguide' }
  },
  {
    path: 'login',
    component: LoginPage,
    data: { title: 'Login' }
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
    StyleguidePage,
    LoginPage
  ],
  providers: [],
})
export class OffsiteRoutingModule { }
