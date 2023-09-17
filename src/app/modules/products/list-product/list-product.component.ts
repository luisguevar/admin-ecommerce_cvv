import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: any = [];
  isLoading$: any = null;

  search: any = null;
  constructor(
    public _productServices: ProductService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productServices.isLoadingSubject;
    this.allProducts();
  }

  allProducts(page = 1) {
    let LINK = "";
    if (this.search) {
      LINK = LINK + "&search=" + this.search;
    }
    this._productServices.allProducts(page, LINK).subscribe((resp: any) => {
      console.log(resp);
      this.products = resp.products.data;
    })
  }

  reset() {
    this.search = null;
    this.allProducts();
  }
  edit(product) {

  }
  delete(product) {

  }
}
