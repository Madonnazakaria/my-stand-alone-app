import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../models/IProduct';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetails],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList {
  products: IProduct[] = [
    { id: 1, name: 'Apple headphones', price: 1500, quantity: 7, categoryId: 1, color:'black', img: 'images/headphones.jpg', dateAdded: new Date(2024,0,10), description: 'High quality Apple headphones with clear sound'},
    { id: 2, name: 'T-shirt', price: 45, quantity: 5, categoryId: 2, material: 'Cotton', color:'red', img: 'images/tshirt.jpg', dateAdded: new Date(2024,1,5), description: 'Comfortable cotton T-shirt'},
    { id: 3, name: 'Vase', price: 50, quantity: 8, categoryId: 3, material: 'Ceramic', color:'white', img: 'images/vase.jpg', dateAdded: new Date(2024,2,15), description: 'Decorative ceramic vase'},
    { id: 4, name: 'iPhone 16', price: 3700, quantity: 3, categoryId: 1, model: 'iPhone 16', color:'blue', img: 'images/phone.png', dateAdded: new Date(2024,3,20), description: 'Latest iPhone 16 Pro Max with advanced features'},
    { id: 5, name: 'Black jacket', price: 120, quantity: 5, categoryId: 2, color:'black', material: 'Leather', img: 'images/jacket.jpg', dateAdded: new Date(2024,4,25), description: 'Stylish black leather jacket'}
  ];

  selectedProduct: IProduct | null = null;

  selectProduct(product: IProduct) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }
}


