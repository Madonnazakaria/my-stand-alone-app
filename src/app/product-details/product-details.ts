// product-details/product-details.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../models/IProduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails {
 @Input() product: IProduct | null = null;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}








