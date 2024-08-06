import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';

import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payFormGroup: FormGroup;
  customer:Customer;

  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    ){}

  ngOnInit(): void {
    this.createPayFormGroup();
  }

  createPayFormGroup(){
    this.payFormGroup = this.formBuilder.group({
      fullName: ["", Validators.required],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', Validators.required]
    })
  }

  pay(){
    if (this.payFormGroup.valid) {

      this.toastrService.success("Ödeme başarılı","",{
        progressBar:true
      })
    }
  }


}