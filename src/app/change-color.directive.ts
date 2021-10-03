import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color = 'red'
   }

}
