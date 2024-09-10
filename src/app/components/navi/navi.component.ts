import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  loggedInUsername: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.checkToLogin();
    // this.checkToLogin2();
  }

  // Kullanıcı giriş yapmış mı kontrol eder
  // checkToLogin(): void {
  //   this.isAuthenticated = this.authService.isAuthanticated();
  //   if (this.isAuthenticated) {
  //     this.loggedInUsername = this.authService.getUserName(); // Kullanıcının ismini alıyoruz
  //   }
  // }

  // Çıkış işlemi
  logout(): void {
    this.authService.logout();
    this.toastrService.info('Çıkış yapıldı.');
    this.loggedInUsername = '';
    window.location.reload();
  }

  checkToLogin():boolean
  {
  this.loggedInUsername=this.authService.getUserName();
  return !!this.loggedInUsername;
  }
}
