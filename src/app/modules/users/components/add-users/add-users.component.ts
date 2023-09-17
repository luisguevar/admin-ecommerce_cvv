import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() usersE: EventEmitter<any> = new EventEmitter();


  isLoading$;
  isLoading = false;

  formGroup: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    public fb: FormBuilder,
    public _userService: UsersService,
    public toaster: Toaster
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.loadForm();
  }

  loadForm() {

    this.formGroup = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(249)])],
      role_id: [1],
      type_user: [2],
      password: [null, Validators.compose([Validators.required])],
      r_password: [null, Validators.compose([Validators.required])],
    })
  }

  save() {

    if (this.formGroup.value.password != this.formGroup.value.r_password) {
      /* alert("LAS CONSTRASEÑAS DEBEN SER IGUALES") */
      this.toaster.open(NoticyAlertComponent,
        { text: `warning-'Error: Debe ingresar contraseñas iguales.'` }
      )
      return;
    }
    this._userService.register(this.formGroup.value).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 400) {
        this.toaster.open(NoticyAlertComponent,
          { text: `warning-'Error: El usuario ya existe.'` }
        )
      } else {
        this.toaster.open(NoticyAlertComponent,
          { text: `success-'Éxito: El usuario se ha registrado correctamente.'` }
        )
        this.modal.close();
        this.usersE.emit(resp.user);
      }
    });

  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}
