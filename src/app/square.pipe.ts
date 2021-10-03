import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square'
})
export class SquarePipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);

    return value+'Enamul';
    
  }

}
