import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidersRoutingModule } from './sliders-routing.module';
import { SlidersComponent } from './sliders.component';
import { SlidersListComponent } from './sliders-list/sliders-list.component';
import { AddSliderComponent } from './components/add-slider/add-slider.component';
import { EditSliderComponent } from './components/edit-slider/edit-slider.component';
import { DeleteSliderComponent } from './components/delete-slider/delete-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [SlidersComponent, SlidersListComponent, AddSliderComponent, EditSliderComponent, DeleteSliderComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
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
export class SlidersModule { }
