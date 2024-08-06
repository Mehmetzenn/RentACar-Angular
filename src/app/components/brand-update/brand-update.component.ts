import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit{
  brandUpdateForm:FormGroup;
  brandId:number
  brands:Brand;
  dataLoaded=false;
  constructor(private brandService:BrandService, private toastrService:ToastrService, private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute ){
    this.activatedRoot.params.subscribe((params) => {
      this.brandId=+params['brandId']
    });

  }
  ngOnInit(): void {
    this.getBrandById(this.brandId);
    this.createBrandUpdateForm();
  }
  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:[{value:this.brandId, disabled:false},Validators.required],
      brandName:["",Validators.required]
    })
  }
  getBrandById(brandId:number)
  {
    this.brandService.getByBrandId(brandId).subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true
    })
  }
  update()
  {
   if(this.brandUpdateForm.valid)
   {
    let brandModel=Object.assign({},this.brandUpdateForm.value)
    this.brandService.update(brandModel).subscribe(response=>{
      console.log(response)
      this.toastrService.success(response.message,"Başarılı")
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          
        }
      }
    })
  }
  else{
    this.toastrService.error("Form Eksik","Dikkat")
  }
}
}