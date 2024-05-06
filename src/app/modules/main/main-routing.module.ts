import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { docenteDataResolver } from '../../core/resolvers/docente-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    resolve: { docenteData: docenteDataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
