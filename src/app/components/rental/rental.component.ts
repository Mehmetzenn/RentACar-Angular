import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit{
  rentals:Rental[]=[]

  constructor(private rentalService:RentalService){}

  ngOnInit(): void {
    this.rental();
  }

  rental(){
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data
    })
  }
}
