import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCreateChangeComponent } from './modules/usuarios/components/usuario-create-change/usuario-create-change.component';
import { UsuariosListComponent } from './modules/usuarios/components/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosListComponent,
  },
  {
    path: 'usuarios/create',
    component: UsuarioCreateChangeComponent,
  },
  {
    path: 'usuarios/change/:id',
    component: UsuarioCreateChangeComponent,
  },

  { path: '**', redirectTo: 'usuarios' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
