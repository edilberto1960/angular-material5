import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankAccount, BankTransaction } from '../../models/bank.model';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS;
  private urlEndUpdate = URL_SERVICIOS + '/api/bank';
  private httpHeaders = new HttpHeaders();
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {  this.cargarStorage(); }


  cargarStorage() {

    if ( localStorage.getItem('token')) {

      this.token = localStorage.getItem('token');
      console.log('Token en bankService ', this.token);

      this.usuario = JSON.parse( localStorage.getItem('user') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  create(cliente: BankAccount): Observable<BankAccount> {
    const url = URL_SERVICIOS + '/api/bank/addBankAccount/';
  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
    // url += '?token=' + this.token;
    return this.http.post<BankAccount>(this.urlEndPoint + '/api/bank/addBankAccount/', cliente, {headers: this.httpHeaders});
  }

  getAllAccounts(): Observable<BankAccount[]> {
    this.token = localStorage.getItem('token');
   console.log('TOKEN EN GETALLACCOUNTS ', this.token);


  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
    // url += '?token=' + this.token;
    return this.http.get<BankAccount[]>(this.urlEndPoint + '/api/bank/getAllBankAccounts/', {headers: this.httpHeaders})
    .pipe(
      map(response => response as BankAccount[]),
      map(err =>  err) );
  }

  updateBankAccount(data: BankAccount): Observable<BankAccount> {
      console.log('Token', this.token);

    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.put<BankAccount>(`${this.urlEndUpdate}/${data.id}`, data, {headers: this.httpHeaders});
      // .pipe(
      //   map(response => response as BankAccount));
    }

    createTransaction(bankTransaction: BankTransaction): Observable<BankTransaction> {
      const url = URL_SERVICIOS + '/api/bank/addBankAccount/';
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.post<BankTransaction>(this.urlEndPoint +
         '/api/bank/add-bank-transaction/', bankTransaction, {headers: this.httpHeaders});
    }


}
