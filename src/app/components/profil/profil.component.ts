import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: User;
  status: string;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser(); // Sayfa yüklendiğinde kullanıcı bilgilerini getir
  }

  getUser() {
    console.log("Kullanıcı bilgileri isteniyor...");
    
    this.authService.getUserById().subscribe(
      (response) => {
        console.log('API Yanıtı:', response);

        // Yanıt yapısını kontrol etmek için log
        console.log('API Yanıtı Data:', response.data);
        
        if (response.success) {  // Eğer API yanıtı başarılıysa
          this.user = response.data;  // response.data içindeki kullanıcı bilgilerini al
          this.status = this.user.status ? 'Aktif' : 'Aktif değil';
        } else {
          this.toastrService.error('Kullanıcı bilgileri alınamadı.');
        }
      },
      (error) => {
        console.log('API Hatası:', error);
        this.toastrService.error('Kullanıcı bilgileri alınamadı.');
      }
    );
  }
  
}
