import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
