import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
import { and } from '@angular/router/src/utils/collection';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {

    // if ( this._usuarioService.estaLogueado() ) {
    //   return true;
    // } else {
    //   console.log( 'Bloqueado por guard' );
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    console.log('IS EXPIRED ', this._usuarioService.isTokenExpired());
    console.log('ESTA LOGEAO ', this._usuarioService.estaLogueado());



    if (this._usuarioService.estaLogueado()) {

      return true;

      } else {


        this.router.navigate(['/login']);
        return false;
      }



  }



}
