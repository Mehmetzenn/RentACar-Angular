import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Kullanıcının admin olup olmadığını kontrol et
    if (this.authService.isAdmin()) {
      console.log("User has admin rights");
      return true;
    } else {
      // Eğer admin değilse login sayfasına yönlendir ve toastr ile mesaj göster
      this.router.navigate(["/"]);
      this.toastrService.error('Bu sayfaya erişmek için yetkiniz yok', 'Erişim Engellendi');
      return false;
    }
  }
}
