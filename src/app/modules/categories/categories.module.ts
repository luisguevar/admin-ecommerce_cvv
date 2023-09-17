import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from './components/delete-categorie/delete-categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [CategoriesComponent, CategorieListComponent, AddCategorieComponent, EditCategorieComponent, DeleteCategorieComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
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
export class CategoriesModule { }

