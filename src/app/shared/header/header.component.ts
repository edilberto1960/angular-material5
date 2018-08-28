import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    // console.log('HEADER COMPONENT ');

    // this.usuario = this._usuarioService.usuario;
    // console.log('USUARION ', this.usuario);

  }

}
