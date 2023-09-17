import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { Toaster } from 'ngx-toast-notifications';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user_selected: any = null;
  @Output() usersE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(
    public _userService: UsersService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
  }

  delete() {
    this._userService.deleteUser(this.user_selected.id).subscribe((resp: any) => {
      console.log(resp);
      this.modal.close();
      this.usersE.emit(this.user_selected);
      this.toaster.open(NoticyAlertComponent,
        { text: `primary-'Confirmación: Se eliminó el registro.'` }
      )
    })
  }

}
