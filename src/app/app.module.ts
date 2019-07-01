import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth/auth.service';
import { SessaoService } from './shared/services/business-service/sessao.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    NgProgressModule.withConfig({
      spinnerPosition: 'right',
      color: '#ff4a3b'
    }),
    NgProgressRouterModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [
    AuthService,
    SessaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
