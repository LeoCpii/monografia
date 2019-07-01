import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {

            if (state.url.indexOf('profissional') > -1) {
                const autenticado = await this.authService.ehAutenticado();

                resolve(true);
                if (autenticado) {
                    const destino = this.authService.rotaDestino(state.url);

                    if (destino.status === autenticado.description.status) {
                        resolve(true);
                    } else {
                        const origem = this.authService.origem(state.url);

                        this.router.navigate(['/erro', '403', origem]);
                        resolve(false);
                    }
                } else {
                    this.router.navigate(['/']);
                    resolve(false);
                }
            } else {
                resolve(true);
            }
        });
    }
}
