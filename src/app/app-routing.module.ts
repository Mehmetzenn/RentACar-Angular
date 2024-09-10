import { NgModule, Component } from '@angular/core';
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
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminGuard } from './guards/admin.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { RentalComponent } from './components/rental/rental.component';
import { RentalUpdateComponent } from './components/rental-update/rental-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomePageComponent}, 
  {path: "home", component:HomePageComponent},

  {path:"cars", component:CarComponent},
  {path:'cars/brand/:brandId', component:CarComponent},//Sol Tarafa Markalar ve Renkleri Getir
  {path:'cars/color/:colorId', component:CarComponent},//Sol Tarafa Markalar ve Renkleri Getir
  {path:"car/:carId",component:CarDetailComponent},//Sol Tarafa Markalar ve Renkleri Getir
  {path:'cars/brand/:brandId/color/:colorId', component: CarComponent },//Sol Tarafa Markalar ve Renkleri Getir


  {path:'pay', component:PaymentComponent },


  {path:"login" , component:LoginComponent},
  {path:"register",component:RegisterComponent},


  {path:"profil",component:ProfilComponent , canActivate:[LoginGuard] }, //Sol Tarafa Markalar ve Renkleri Getir
  

  
  {path:'cars/list', component: CarsDetailComponent, canActivate:[AdminGuard] },  
  {path:'cars/list/add', component: CarAddComponent, canActivate:[LoginGuard] },
  // {path:'cars/list/delete/:carId', component:CarDeleteComponent}
  {path:'cars/list/update/:carId', component:CarUpdateComponent,canActivate:[LoginGuard]},

    
  {path:'brands/list', component: BrandsDetailComponent,canActivate:[AdminGuard] }, 
  {path:'brands/list/add', component: BrandAddComponent,canActivate:[LoginGuard] },
  {path:'brands/list/update/:brandId', component:BrandUpdateComponent,canActivate:[LoginGuard]},


  {path:'colors/list', component: ColorsDetailComponent,canActivate:[AdminGuard] }, 
  {path:'colors/list/add', component: ColorAddComponent,canActivate:[LoginGuard] },
  {path:'colors/list/update/:colorId', component:ColorUpdateComponent,canActivate:[LoginGuard]},

  {path:'rental', component:RentalComponent,canActivate:[AdminGuard]},
  {path:'rental/:rentalId', component:RentalUpdateComponent},


  {path:"contact",component:ContactComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
