import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/shared/models/usuarios';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit {
  usuarios!: Usuarios[];

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((dados) => (this.usuarios = dados));
  }

  onDelete(id: string) {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) return;

    usuario.isDeleting = true;

    this.usuarioService
      .delete(id)
      .subscribe(
        (sucess) => {
          alert(sucess);
          this.usuarios = this.usuarios.filter((u) => u.id !== id);
        },
        (err) => {
          if (err.status == 500) {
            alert(err.error);
          } else if (err.status == 403) {
            alert(err.error.message);
          }
        }
      )
      .add(() => (usuario.isDeleting = false));
  }
}
