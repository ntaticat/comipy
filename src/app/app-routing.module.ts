import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
