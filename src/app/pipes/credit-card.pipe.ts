// pipes/credit-card.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
  standalone: true
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return '';
    const cleanedValue = value.replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < cleanedValue.length; i += 4) {
      parts.push(cleanedValue.substring(i, i + 4));
    }
    return parts.join('-');
  }
}

