import { RouterModule } from '@angular/router';
import { UsuarioCreateChangeComponent } from './components/usuario-create-change/usuario-create-change.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosListComponent, UsuarioCreateChangeComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],
  exports: [UsuariosListComponent],
})
export class UsuariosModule {}
