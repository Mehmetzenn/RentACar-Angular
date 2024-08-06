import { filter } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: Color[], filterText:string): Color[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((co:Color) => co.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
