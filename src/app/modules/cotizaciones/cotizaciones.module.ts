import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { ListCotizacionesComponent } from './list-cotizaciones/list-cotizaciones.component';
import { CotizacionesComponent } from './cotizaciones.component';
import { AddCotizacionComponent } from './add-cotizacion/add-cotizacion.component';


@NgModule({
  declarations: [CotizacionesComponent, ListCotizacionesComponent, AddCotizacionComponent],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
  ]
})
export class CotizacionesModule { }
