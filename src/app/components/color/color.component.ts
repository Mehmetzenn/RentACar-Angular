import { filter } from 'rxjs';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[]
  currentColor?:Color
  filterText:""
  constructor(private colorService:ColorService, private router: Router){}


  ngOnInit(): void {
    this.getColors();
  }
  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color
    this.router.navigate(['/cars/color', color.colorId]);
  }

  getCurrentColorClass(color:Color){
    if (color == this.currentColor) {
      return "list-group-item active"
    }
    else {
      return "list-group-item"
    }
  }


  clearCurrentColor(){
    this.currentColor = undefined;
    this.router.navigate(['/cars']);
  }
}