import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionesComponent } from './cotizaciones.component';
import { ListCotizacionesComponent } from './list-cotizaciones/list-cotizaciones.component';
import { AddCotizacionComponent } from './add-cotizacion/add-cotizacion.component';

const routes: Routes = [
  {
    path: '',
    component: CotizacionesComponent,
    children: [
      {
        path: 'list-cotizaciones',
        component: ListCotizacionesComponent,
      },

      {
        path: 'add-cotizacion',
        component: AddCotizacionComponent,
      },
     
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
