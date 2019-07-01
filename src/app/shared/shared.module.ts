import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { AuthGuardService } from './services/auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  providers: [
    AuthGuardService
  ],
  declarations: [

  ],
  exports: [
    ComponentsModule,
  ]
})
export class SharedModule { }
