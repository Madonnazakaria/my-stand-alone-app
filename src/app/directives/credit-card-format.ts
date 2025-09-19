import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditCardFormat]'
})
export class CreditCardFormatDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input = this.el.nativeElement.value;

    input = input.replace(/\D/g, '');

    if (input.length > 16) input = input.substring(0, 16);

    const sections = input.match(/.{1,4}/g);
    this.el.nativeElement.value = sections ? sections.join('-') : input;

    if (!input) this.el.nativeElement.value = '0000-0000-0000-0000';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter','Home','End'];
    if (
      allowedKeys.includes(event.key) ||
      (event.key >= '0' && event.key <= '9') ||
      event.ctrlKey || event.metaKey
    ) {
      return;
    }
    event.preventDefault();
  }
}
