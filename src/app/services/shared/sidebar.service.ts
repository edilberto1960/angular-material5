import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Bancos',
      icono: 'fa fa-bank (alias)',
      submenu: [
        { titulo: 'Graficas', url: '/usuarios' },
        { titulo: 'Alta Cuenta', url: '/bank' },
        { titulo: 'Ingresar Deposito', url: '/medicos' },
        { titulo: 'Ingresar Cheque', url: '/check' },
        { titulo: 'Movimientos', url: '/medicos' }


      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' }
      ]
    }
  ];

  constructor() { }

}
