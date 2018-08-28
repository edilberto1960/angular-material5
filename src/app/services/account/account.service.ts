import { Injectable } from '@angular/core';
import { AccountName } from '../../models/account.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS + '/api/account';
  private httpHeaders = new HttpHeaders();


  constructor(private http: HttpClient) { this.cargarStorage(); }

  cargarStorage() {
  console.log('TOKEN', this.token);

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('user') );
      console.log('TOKEN5', this.token);
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  // agregar: , {headers: this.httpHeaders}
  getAllAccounts(): Observable<AccountName[]> {

    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.get<AccountName[]>(this.urlEndPoint + '/getAllAccounts/')
      .pipe(
        map(response => response as AccountName[]));
    }


}
