import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../categories/_services/categorie.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  isLoading$: any;

  title: any = null;
  sku: any = null;
  categorie_id: any = '';
  price_soles: any = '';
  price_usd: any = '';
  resumen: any = null;
  description: any = null;

  text: any = null;
  tags: any = [];

  imagen_file: any = null;
  imagen_previzualiza: any = null;

  images_files: any = [];
  img_files: any = null;
  img_previzualizar: any = null;
  categorias: any = [];

  constructor(
    public toaster: Toaster,
    public _productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    setTimeout(() => {
      this._productService.getCategorias().subscribe((resp: any) => {
        this.categorias = resp.categories;
        console.log('categorias: ', resp)
      })
    }, 20);
  }

  loadServices() {
    this._productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productService.isLoadingSubject.next(false)
    }, 50);
  }

  processFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: El archivo cargado no es compatible.'` }
      );
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
    this.loadServices();
  }

  addTags() {
    this.tags.push(this.text)
    this.text = null;
  }
  removeTags(index) {
    this.tags.splice(index, 1);
  }

  addFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: El archivo cargado no es compatible.'` }
      );
      return;
    }
    this.img_files = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.img_files);
    reader.onloadend = () => this.img_previzualizar = reader.result;
  }

  addImages() {
    this.images_files.push({
      file: this.img_files,
      show: this.img_previzualizar,
    });
    this.img_files = null;
    this.img_previzualizar = null;
  }

  removeImages(index) {
    this.images_files.splice(index, 1);
  }

  createProduct() {

    if (!this.title ||
      !this.sku ||
      !this.categorie_id ||
      !this.price_soles ||
      !this.price_usd ||
      !this.resumen ||
      !this.description ||
      !this.imagen_file) {
      !this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: Todos los campos son obligatorios.'` }
      );
      return;
    }

    if (this.images_files == 0) {
      this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: Debes ingresar un conjunto de imágenes.'` }
      );
      return;
    }
    let formData = new FormData();

    formData.append("title", this.title)
    formData.append("sku", this.sku)
    formData.append("categorie_id", this.categorie_id)
    formData.append("price_soles", this.price_soles)
    formData.append("price_usd", this.price_usd)
    formData.append("resumen", this.resumen)
    formData.append("description", this.description)

    formData.append("tags", this.tags)
    formData.append("imagen_file", this.imagen_file)//principal imagen

    let index = 0;
    for (const imagen of this.images_files) { //galeria de imagenes
      formData.append("files[" + index + "]", imagen.file);
      index++;
    }

    this._productService.createProduct(formData).subscribe((resp: any) => {
      console.log(resp);
    })
  }
}
