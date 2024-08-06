import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  currentCar:Car;
  dataLoaded = false;
  filterText = "";

  constructor(private carService:CarService , private activatedRoot:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params => {
      if (params["colorId"] && params["brandId"]) {
        this.getCarsByColorAndBrand(params["brandId"], params["colorId"]);
      }
      else if (params["brandId"]) {
        this.GetCarsByBrand(params["brandId"]);
      } else if (params["colorId"]) {
        this.GetCarsByColor(params["colorId"]);
      } else {
        this.getCars();
      }
    });
    
  }
  
  getCars(){
    this.carService.getCars().subscribe((response) =>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  GetCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe((response) =>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  GetCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response) =>{
      this.cars = response.data
      this.dataLoaded = true
    })
  } 
  
  getCarsByColorAndBrand(brandId:number, colorId:number){
    this.carService.getCarsByColorAndBrand(brandId,colorId).subscribe((response) =>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }
}
