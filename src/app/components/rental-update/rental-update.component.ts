import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.css']
})
export class RentalUpdateComponent implements OnInit {
  rentalUpdateForm: FormGroup = new FormGroup({});
  rental: Rental | null = null;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rentalId']) {
        this.id = params['rentalId']; // Store the rentalId in the id property
        this.getRentalById(this.id);
      }
    });
    this.createRentalForm();
  }

  createRentalForm() {
    this.rentalUpdateForm = this.formBuilder.group({
      id: [{ value: this.id, disabled: true }, Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getRentalById(id: number) {
    this.rentalService.getByRentalId(id).subscribe(response => {
      this.rental = response.data;
      this.rentalUpdateForm.patchValue({ returnDate: this.rental.returnDate });
    });
  }

  updateRental() {
    if (this.rentalUpdateForm.valid) {
      const updatedRental = { ...this.rental, returnDate: this.rentalUpdateForm.value.returnDate };
      this.rentalService.update(updatedRental).subscribe(
        (response) => {
          this.toastrService.success('Dönüş Tarihi başarıyla güncellendi', 'Başarılı');
          this.router.navigate(['/rentals']); 
        },
        (error) => {
          this.toastrService.error('Güncelleme başarısız oldu', 'Hata');
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Uyarı');  
    }
  }
}
