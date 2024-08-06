import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];  
  isDataLoaded = false;
  selectedBrandId: number | null = null
  selectedColorId: number | null = null
  routerLink = ""

  constructor( private brandService:BrandService, private colorService:ColorService){}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
      this.isDataLoaded = true  
    })
  }
  
  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
      this.isDataLoaded = true
    })
  }

  changeButtonClass() {
    if (this.selectedBrandId || this.selectedColorId) {
      return "btn btn-warning"
    } else {
      return "btn btn-warning disabled"
    }
  }

  changeRouteLink() {
    if (this.selectedBrandId !== undefined && this.selectedColorId !== undefined) {
      this.routerLink = "/cars/brand/" + this.selectedBrandId + "/color/" + this.selectedColorId
      return this.routerLink
    } else if (this.selectedBrandId == undefined && this.selectedColorId !== undefined) {
      this.routerLink = "/car/color/" + this.selectedColorId
      return this.routerLink
    } else if (this.selectedBrandId !== undefined && this.selectedColorId == undefined) {
      this.routerLink = "/car/brand/" + this.selectedBrandId
      return this.routerLink
    } else {
      this.routerLink = ""
      return this.routerLink
    }
  }


}
