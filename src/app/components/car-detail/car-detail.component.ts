// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CarDetail } from 'src/app/models/carDetail';
// import { CarDetailService } from 'src/app/services/car-detail.service';

// @Component({
//   selector: 'app-car-detail',
//   templateUrl: './car-detail.component.html',
//   styleUrls: ['./car-detail.component.css']
// })
// export class CarDetailComponent implements OnInit {
  
// carsDetail:CarDetail[]=[];
// carsDetailcar:CarDetail;
// dataLoaded=false;


// baseUrl="'https://localhost:7220/Uploads/Images/";
// constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute) {}


// ngOnInit(): void {
//   this.activatedRoute.params.subscribe(params => {
//     const carId = params['carId'];
//     if (carId) {
//       this.getCarsDetailByCar(carId);
//     }
//   });
// }

// getCarsDetailByCar(carId:number)
//   {
//     this.carDetailService.getCarsDetailByCar(carId).subscribe(response=>{
//       this.carsDetailcar=response.data;
//       this.dataLoaded=true;
//     })
//   }

// getCarsDetail()
//   {
//     this.carDetailService.getCarsDetail().subscribe(response=>{
//       this.carsDetail=response.data;
//       this.dataLoaded=true;
//     })
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
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
  returnDate: Date | null = null;
  rentalMessage: string = '';


  baseUrl = "https://localhost:7220/Uploads/Images/";

  constructor(private carDetailService: CarDetailService,private rentalService:RentalService, private activatedRoute: ActivatedRoute,private tostrService:ToastrService) {}

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
        this.tostrService.success(response.message)
      }
      else{
        this.tostrService.warning(response.message)
      }
    });
  }
}
