import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductService } from 'src/app/modules/products/_services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-imagen-p',
  templateUrl: './delete-imagen-p.component.html',
  styleUrls: ['./delete-imagen-p.component.scss']
})
export class DeleteImagenPComponent implements OnInit {

  @Input() imagen_: any = null;
  @Output() ImagenE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(
    public _productService: ProductService,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
  }

  delete() {
    this._productService.deleteImagenProduct(this.imagen_.id).subscribe((resp: any) => {
      console.log(resp);
      this.modal.close();
      this.ImagenE.emit(this.imagen_);
    })
  }


}
