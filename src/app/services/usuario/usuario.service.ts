import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { pipe } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

// tslint:disable-next-line:no-inferrable-types
export const TOKEN_NAME: string = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  usuario: Usuario;
  token: string;
  currentUser: Boolean = false;

   constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.currentUser) ? true : false;
  }

  cargarStorage() {
console.log('CARGAR STORAGE');

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('user') );
    } else {
      this.token = '';
     // this.usuario = null;
    }

  }

  isTokenExpired(token?: string): boolean {
    if (!token) {

      token = this.getToken();
      return true;
    }


    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {

      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    console.log('Token en getToken ', this.token);
    
    return localStorage.getItem(this.token);
  }

   setToken(token: string): void {
     localStorage.setItem(TOKEN_NAME, token);
   }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }


  guardarStorage( token: string, usuario: Usuario ) {

    console.log('Recibimos Token ', token);
    
  //  localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('user', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } ).pipe(
                map( (resp: any) => {
                  this.guardarStorage( resp.token, resp.usuario );
                  return true;
                }));


  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {

      console.log('ENTRAMOS A LOGIN CON TOKEN: ', this.token);

    }

    const url = URL_SERVICIOS + '/api/login';
    return this.http.post( url, usuario ).pipe(
                map( (resp: any) => {

                  if (resp && resp.token) {

                    localStorage.setItem('currentUser', JSON.stringify(resp));
                    this.currentUser = true;
                  }
                  console.log('Respuesta Recivida ', resp);
                  return true;
                }));



  }


  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(
              map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              }));
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario ).pipe(
                map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( this.token, usuarioDB );
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                }));

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( this.token, this.usuario );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(
                map( (resp: any) => resp.usuarios ));

  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url ).pipe(
                map( resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                }));

  }

}
