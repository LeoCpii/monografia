import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  providers:[],
  declarations: [],
  exports:[
    ComponentsModule
  ]
})
export class SharedModule { }
