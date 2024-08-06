import { Component, Input, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  @Input() carId: number; // Bu alan Input olarak tanımlandı
  carImages: CarImage[] = [];

  baseUrl = "https://localhost:7220/Uploads/Images/";

  constructor(private carImageService: CarImageService) {}

  ngOnInit(): void {
    if (this.carId) {
      this.getCarImagesByCarId(this.carId);
    } else {
      console.error('carId is not defined');
    }
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCar(carId).subscribe(response => {
      this.carImages = response.data;
      console.log(this.carImages); // Veri kontrolü için konsola yazdırın
    });
  }
}

