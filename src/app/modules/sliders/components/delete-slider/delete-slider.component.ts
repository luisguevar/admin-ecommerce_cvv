import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SlidersService } from '../../_service/sliders.service';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-delete-slider',
  templateUrl: './delete-slider.component.html',
  styleUrls: ['./delete-slider.component.scss']
})
export class DeleteSliderComponent implements OnInit {

  @Input() slider_selected: any = null;
  @Output() sliderE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(
    public _slidersService: SlidersService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._slidersService.isLoading$;
  }

  delete() {
    this._slidersService.deleteSlider(this.slider_selected.id).subscribe((resp: any) => {
      console.log(resp);
      this.modal.close();
      this.sliderE.emit(this.slider_selected);
      this.toaster.open(NoticyAlertComponent,
        { text: `primary-'Confirmación: Se eliminó el registro.'` }
      )
    })
  }

}
