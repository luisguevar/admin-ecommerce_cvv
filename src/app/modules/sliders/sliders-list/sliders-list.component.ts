import { Component, OnInit } from '@angular/core';
import { URL_BACKEND } from 'src/app/config/config';
import { SlidersService } from '../_service/sliders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSliderComponent } from '../components/add-slider/add-slider.component';
import { EditSliderComponent } from '../components/edit-slider/edit-slider.component';
import { DeleteSliderComponent } from '../components/delete-slider/delete-slider.component';

@Component({
  selector: 'app-sliders-list',
  templateUrl: './sliders-list.component.html',
  styleUrls: ['./sliders-list.component.scss']
})
export class SlidersListComponent implements OnInit {


  isLoading$;
  search: any = null;

  sliders: any = [];
  URL_BACKEND: any = URL_BACKEND;

  constructor(
    public _slidersService: SlidersService,
    public modelService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._slidersService.isLoading$;
    this.allSliders();
  }
  allSliders() {
    this._slidersService.allSliders().subscribe((resp: any) => {
      console.log(resp);
      this.sliders = resp.sliders;
    })
  }

  addSlider() {
    const modalRef = this.modelService.open(AddSliderComponent, { centered: true, size: 'md' });
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.sliderE.subscribe((resp: any) => {
      // console.log(resp);
      this.sliders.unshift(resp);
    });
  }

  edit(slider) {
    const modalRef = this.modelService.open(EditSliderComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.slider_selected = slider;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.sliderE.subscribe((resp: any) => {
      let INDEX = this.sliders.findIndex(item => item.id == resp.id);
      this.sliders[INDEX] = resp;
    })
  }
  delete(slider) {
    const modalRef = this.modelService.open(DeleteSliderComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.slider_selected = slider;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.sliderE.subscribe((resp: any) => {
      let INDEX = this.sliders.findIndex(item => item.id == resp.id);
      this.sliders.splice(INDEX, 1);
    })
  }


}
