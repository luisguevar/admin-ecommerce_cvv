import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { AsideMenuAdminGeneral } from '../../configs/nav/aside-menu-admin-general.config';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  constructor(private authservice: AuthService,) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  
  private loadMenu() {
    // this.setMenu(DynamicAsideMenuConfig);
    if(this.authservice.user.role.name == 'ADMINISTRADOR GENERAL'){
      this.setMenu(AsideMenuAdminGeneral);
    } 
    
    else {
      this.setMenu([]);
    }
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}
