import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Supplier } from '../../models/supplier.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS + '/api/supplier';
  private httpHeaders = new HttpHeaders();



  constructor(private http: HttpClient) { this.cargarStorage(); }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('user') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  getAllSuppliers(): Observable<Supplier[]> {

    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.get<Supplier[]>(this.urlEndPoint + '/getAllSuppliers/', {headers: this.httpHeaders})
      .pipe(
        map(response => response as Supplier[]));
    }

}
