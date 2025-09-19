import { Injectable, inject } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { ProductsComponent } from '../products/products';

// Injectable decorator
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //  Dependency Injection بالـ constructor
  constructor() {
  }

  private products: IProduct[] = [
    { id: 1, name: 'Apple headphones', price: 1500, quantity: 7, categoryId: 1, color:'black', img: 'assets/images/headphones.jpg', description: 'High quality Apple headphones with clear sound' },
    { id: 2, name: 'T-shirt', price: 45, quantity: 5, categoryId: 2, material: 'Cotton', color:'red', img: 'assets/images/tshirt.jpg',description: 'Comfortable cotton T-shirt' },
    { id: 3, name: 'Vase', price: 50, quantity: 8, categoryId: 3, material: 'Ceramic', color:'white', img: 'assets/images/vase.jpg',description: 'Decorative ceramic vase' },
    { id: 4, name: 'iPhone 16', price: 3700, quantity: 3, categoryId: 1, model: 'iPhone 16', color:'blue', img: 'assets/images/phone.png' ,  description: 'Latest iPhone 16 Pro Max with advanced features'},
    { id: 5, name: 'Black jacket', price: 120, quantity: 5, categoryId: 2, color:'black', material: 'leather', img: 'assets/images/jacket.jpg' ,description: 'Stylish black leather jacket' }
  ];


  getProductsByCatID(catID: number): IProduct[] {
    if (catID === 0) return this.products;
    return this.products.filter(p => p.categoryId === catID);
  }


  getProductByID(prodID: number): IProduct | undefined {
    return this.products.find(p => p.id === prodID);
  }
}
