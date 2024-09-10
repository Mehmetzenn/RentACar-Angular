import { filter } from 'rxjs';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  brands:Brand[]=[];
  currentBrand?:Brand;
  filterText:""
  constructor(private brandService:BrandService, private router: Router){}
  


  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    this.router.navigate(['/cars/brand', brand.brandId]);
  }
  getCurrentBrandClass(brand:Brand){
    if (brand==this.currentBrand) {
      return "list-group-item active";
    }
    else{
      return "list-group-item ";
    }

  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
        return "list-group-item"
    }
  }

  clearCurrentBrand(){
    this.currentBrand = undefined;
    this.router.navigate(['/cars']);
  }
}
