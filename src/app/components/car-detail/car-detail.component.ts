
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalAdd } from 'src/app/models/rentalAdd';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetail[] = [];
  selectedCarDetail: CarDetail;
  dataLoaded = false;
  rentDate: Date | null = null;
  userId:number
  rentalMessage: string = '';


  baseUrl = "https://localhost:7220/Uploads/Images/";

  constructor(private carDetailService: CarDetailService,
    private rentalService:RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private authService:AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const carId = params['carId'];
      if (carId) {
        this.getCarsDetailByCar(carId);
        this.getCheckRentalCarId(carId)
      }
    });
  }

  getCarsDetailByCar(carId: number) {
    this.carDetailService.getCarsDetailByCar(carId).subscribe(response => {
      this.selectedCarDetail = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsDetail() {
    this.carDetailService.getCarsDetail().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  
  getCheckRentalCarId(carId: number) {
    this.rentalService.checkRentalCarId(carId).subscribe((response) => {
      console.log(response);
      this.rentalMessage = response.message;
      if (response.success) {
        this.toastrService.success(response.message)
      }
      else{
        this.toastrService.warning(response.message)
      }
    });
  }
  add() {
    if (this.rentDate) {
      this.authService.getUserById().subscribe(
        response => {

          const customerId = response.data.id; 
          

          const rental: RentalAdd = {
            carId: this.selectedCarDetail.carId,
            customerId: customerId, 
            rentDate: this.rentDate,
            returnDate: null
          };
  

          this.rentalService.add(rental).subscribe(
            response => {
              this.toastrService.success(response.message, "Başarılı");
              console.log(response);
            },
            responseError => {
              console.error(responseError);
              if (responseError.error.Errors && responseError.error.Errors.length > 0) {
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası");
                }
              } else {
                this.toastrService.error("Bir hata oluştu", "Hata");
              }
            }
          );
        },
        error => {
          console.error("Kullanıcı bilgileri alınamadı", error);
          this.toastrService.error("Kullanıcı bilgileri alınamadı", "Hata");
        }
      );
    }
  }
}  