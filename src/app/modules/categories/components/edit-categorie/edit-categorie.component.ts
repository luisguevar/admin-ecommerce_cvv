import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../_services/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { URL_BACKEND } from 'src/app/config/config';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  @Input() categoria_selected: any;
  @Output() clientsE: EventEmitter<any> = new EventEmitter();
  isLoading$: any;
  isLoading: boolean = false;

  name: any = null;
  icono: any = null;
  imagen_file: any = null;
  imagen_previzualiza: any = null;
  constructor(
    public _categorieService: CategorieService,
    public modal: NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.name = this.categoria_selected.name;
    this.icono = this.categoria_selected.icono;
    this.imagen_previzualiza = URL_BACKEND + 'storage/' + this.categoria_selected.imagen;
  }

  processFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent, { text: `warning-'El archivo cargado no es compatible'` });
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
    // setTimeout(() => {
    //   console.log(this.imagen_previzualiza);
    // }, 25);
  }

  save() {
    let formData = new FormData();
    formData.append("imagen_file", this.imagen_file);
    formData.append("name", this.name);
    formData.append("icono", this.icono);
    this._categorieService.updateCategoria(this.categoria_selected.id, formData).subscribe((resp: any) => {
      console.log(resp);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Se actualizó la categoría correctamente.'` });
      this.clientsE.emit(resp.categorie);
      this.modal.close();
    })
  }


}
