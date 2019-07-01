/* tslint:disable max-line-length */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './shared/components/components.module';
import { AuthGuardService } from './shared/services/auth/auth.guard';

const routes: Routes = [
    { path: 'offsite', loadChildren: './pages/offsite/offsite-routing.module#OffsiteRoutingModule', data: { title: 'Offsite' } },
    { path: 'home', loadChildren: './pages/home/home-routing.module#HomeRoutingModule', data: { title: 'home' } },
    { path: 'estudante', loadChildren: './pages/estudante/estudante-routing.module#EstudanteRoutingModule', data: { title: 'estudante' } },
    { path: 'profissional', loadChildren: './pages/profissional/profissional-routing.module#ProfissionalRoutingModule', data: { title: 'profissional' } },
    { path: 'perguntas/:escolha', loadChildren: './pages/perguntas/perguntas-routing.module#PerguntasRoutingModule', data: { title: 'perguntas' } },
    { path: '', loadChildren: './pages/boas-vindas/boas-vindas-routing.module#BoasVindasRoutingModule', data: { title: 'Boas Vindas' } },
    { path: 'erro', loadChildren: './pages/erro/erro-routing.module#ErroRoutingModule', data: { title: 'erro' } },
];

const routerOptions: ExtraOptions = {
    onSameUrlNavigation: 'reload',
};

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
