import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';


const routes: Routes = [

  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: 'lista',
        component: CategorieListComponent
      },
      {
        path: '', redirectTo: 'lista', pathMatch: 'full',
      },
      {
        path: '**', redirectTo: 'lista', pathMatch: 'full',
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
