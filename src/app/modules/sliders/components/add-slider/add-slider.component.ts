import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SlidersService } from '../../_service/sliders.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss']
})
export class AddSliderComponent implements OnInit {


  @Output() sliderE: EventEmitter<any> = new EventEmitter();
  isLoading$: any;
  isLoading: boolean = false;

  name: any = null;
  url: any = null;
  imagen_file: any = null;
  imagen_previzualiza: any = null;
  constructor(
    public _slidersService: SlidersService,
    public modal: NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._slidersService.isLoading$;
  }

  processFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent, { text: `warning-'Error: El archivo cargado no es compatible.'` });
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
    if (this.name) {
      formData.append("name", this.name);
    }
    if (this.url) {
      formData.append("url", this.url);
    }
    this._slidersService.createSliders(formData).subscribe((resp: any) => {
      console.log(resp);
      this.sliderE.emit(resp.slider);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Éxito: Slider registrado satisfactoriamente.'` });
      this.modal.close();
    })
  }
}
