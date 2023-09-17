import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  @Input() user_selected: any = null;
  @Output() usersE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  formGroup: FormGroup;

  constructor(
    public fb: FormBuilder,
    public _userService: UsersService,
    public modal: NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.loadForm();
  }
  loadForm() {
    this.formGroup = this.fb.group({
      name: [this.user_selected.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [this.user_selected.surname, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [this.user_selected.email, Validators.compose([Validators.required, Validators.email, Validators.maxLength(249),])],
      state: [this.user_selected.state],
      role_id: [this.user_selected.role_id],
      password: [null, Validators.compose([Validators.nullValidator, Validators.maxLength(249),])],
      r_password: [null, Validators.compose([Validators.nullValidator, Validators.maxLength(249),])]
    });
  }

  save() {
    if (this.formGroup.value.password && this.formGroup.value.r_password) {
      if (this.formGroup.value.password != this.formGroup.value.r_password) {
        this.toaster.open(NoticyAlertComponent, { text: `warning-'Error: Debe ingresar contraseñas iguales.'` });
        return;
      }
    }
    this._userService.update(this.user_selected.id, this.formGroup.value).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 400) {
        this.toaster.open(NoticyAlertComponent, { text: `warning-'Error: El usuario ya existe.'` });

        return;
      } else {
        this.toaster.open(NoticyAlertComponent, { text: `success-'Éxito: El usuario se ha actualizado satisfactoriamente.'` });

        this.modal.close();
        console.log('RESPUESTA EMITIDA: ', resp.user);
        this.usersE.emit(resp.user);
        return;
      }
    })
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
