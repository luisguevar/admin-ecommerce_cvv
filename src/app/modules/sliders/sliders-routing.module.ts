import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlidersComponent } from './sliders.component';
import { SlidersListComponent } from './sliders-list/sliders-list.component';

const routes: Routes = [
  {
    path: '',
    component: SlidersComponent,
    children: [
      {
        path: 'lista',
        component: SlidersListComponent
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
export class SlidersRoutingModule { }
