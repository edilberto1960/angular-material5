import {ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    // console.log('ERROR EN ERROR SERVICE ', error);

    if (error.status === 401 || error.status === 403) {
      router.navigate(['/login']);
  }
    // A client-side or network error occurred.
    // console.error('An error occurred:', error.message);
     router.navigate(['/login']);


}

}
