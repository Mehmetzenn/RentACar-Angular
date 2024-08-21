import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car.';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup = new FormGroup({});
  brands: Brand[] = [];
  colors: Color[] = [];
  cars: Car[] = [];
  id:number
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.id = params['carId']; // Store the carId in the id property
        this.getCarsById(this.id);
        this.getBrands();
        this.getColors();
        this.createCarForm();        
      }
    });
  }
  
  createCarForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [{ value: this.id, disabled: true }, Validators.required], // Set the id field with the route parameter value
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      carName: ['', Validators.required],
      carDescription: ['', Validators.required],
    });
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araç Güncellendi', 'Başarılı');
          this.backToCarList();
        },
         (responseError) => {
           if (responseError.error.Errors.length>0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
             }
           }
         }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }

  getCarsById(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.cars = response.data;  
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  backToCarList() {
    this.router.navigate(['cars/list']);
  }
}