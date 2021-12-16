import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[textareaAutoresize]'
})
export class TextareaAutoresizeDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  @HostListener(':input')
  onInput(): void {
    this.resize();
  }

  ngOnInit(): void {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize(): void {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 10 + 'px';
  }

}
