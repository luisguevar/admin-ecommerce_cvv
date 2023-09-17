import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../_services/categorie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategorieComponent } from '../components/add-categorie/add-categorie.component';
import { URL_BACKEND } from 'src/app/config/config';
import { EditCategorieComponent } from '../components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from '../components/delete-categorie/delete-categorie.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  isLoading$;
  isLoading = false;
  categorias: any;
  search: any;
  URL_BACKEND: any = URL_BACKEND;
  constructor(

    public _categoriaService: CategorieService,
    public _modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categoriaService.isLoading$;
    this.allCategories();
  }
  allCategories() {
    
    this._categoriaService.allCategories(1, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.categorias = resp.categorias;
    })
  }

  reset() {
    this.search = null;
    this.allCategories();
  }
  addCategoria() {
    const modalRef = this._modelService.open(AddCategorieComponent, { centered: true, size: 'lg' });
    
    modalRef.componentInstance.clientsE.subscribe((resp: any) => {
      // console.log(resp);
      this.categorias.unshift(resp);
    });
  }

  edit(categoria) {
    const modalRef = this._modelService.open(EditCategorieComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.categoria_selected = categoria;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.clientsE.subscribe((resp: any) => {
      let INDEX = this.categorias.findIndex(item => item.id == resp.id);
      this.categorias[INDEX] = resp;
    })
  }
  delete(categoria) {
    const modalRef = this._modelService.open(DeleteCategorieComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.categoria_selected = categoria;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.clientsE.subscribe((resp: any) => {
      let INDEX = this.categorias.findIndex(item => item.id == resp.id);
      this.categorias.splice(INDEX, 1);
    })
  }
}
