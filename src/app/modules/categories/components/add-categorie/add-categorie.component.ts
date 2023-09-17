import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from '../../_services/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  @Output() clientsE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;
  name: any = null;
  imagen_previzualiza: any = null;
  icono: any = null;

  imagen_file: any = null;

  constructor(
    public modal: NgbActiveModal,
    public _categoriaService: CategorieService,
    public toaster: Toaster

  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categoriaService.isLoading$;
  }

  processFile($event) {

    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: El archivo cargado no es compatible.'` }
      )
      return;
    }

    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result; //base 64
    /* setTimeout(() => {
      console.log(this.imagen_previzualiza);
    }, 25); */

  }

  save() {

    let formData = new FormData();
    formData.append("imagen_file", this.imagen_file);
    formData.append("name", this.name);
    formData.append("icono", this.icono);

    this._categoriaService.createCategoria(formData).subscribe((resp: any) => {
      this.clientsE.emit(resp.categorie);
      this.toaster.open(NoticyAlertComponent,
        { text: `success-'Éxito: Categoría registrada satisfactoriamente.'` }
      )
      this.modal.close();
    })
  }
}
