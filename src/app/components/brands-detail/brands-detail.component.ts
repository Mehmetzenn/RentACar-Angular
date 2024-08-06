import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands-detail',
  templateUrl: './brands-detail.component.html',
  styleUrls: ['./brands-detail.component.css']
})
export class BrandsDetailComponent implements OnInit {

  brands:Brand[]=[];

 constructor(private brandService:BrandService){}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data
    })
  }
}
