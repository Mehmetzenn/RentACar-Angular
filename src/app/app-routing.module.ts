import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarsDetailComponent } from './components/cars-detail/cars-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandsDetailComponent } from './components/brands-detail/brands-detail.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorsDetailComponent } from './components/colors-detail/colors-detail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:'cars/brand/:brandId', component:CarComponent},
  {path:'cars/color/:colorId', component:CarComponent},
  {path:"car/:carId",component:CarDetailComponent},
  {path:'cars/brand/:brandId/color/:colorId', component: CarComponent },
  {path:'pay', component:PaymentComponent },
  

  
  {path:'cars/list', component: CarsDetailComponent },  
  {path:'cars/list/add', component: CarAddComponent },
  // {path:'cars/list/delete/:carId', component:CarDeleteComponent}
  {path:'cars/list/update/:carId', component:CarUpdateComponent},

    
  {path:'brands/list', component: BrandsDetailComponent }, 
  {path:'brands/list/add', component: BrandAddComponent },
  {path:'brands/list/update/:brandId', component:BrandUpdateComponent},


  {path:'colors/list', component: ColorsDetailComponent }, 
  {path:'colors/list/add', component: ColorAddComponent },
  {path:'colors/list/update/:colorId', component:ColorUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
