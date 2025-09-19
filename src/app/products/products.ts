import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductCardDirective } from '../directives/product-card-style.directive';
import { CreditCardPipe } from '../pipes/credit-card.pipe';
import { ProductDetails } from '../product-details/product-details';
import { CreditCardFormatDirective } from '../directives/credit-card-format';
import { FooterComponent } from '../footer/footer';
import { IProduct } from '../models/IProduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardDirective,
    CreditCardPipe,
    ProductDetails,
    FooterComponent,
    CreditCardFormatDirective
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {
  today: Date = new Date();  // تاريخ اليوم;
  // Search + filter
  searchTerm = signal('');
  selectedCategoryId = signal(0);
  todayDate: Date = new Date();

  // Products
  products = signal<IProduct[]>([
    { id: 1, name: 'Apple headphones', price: 1500, quantity: 7, categoryId: 1, color:'black', img: 'images/headphones.jpg', dateAdded: new Date(2024,0,10), description: 'High quality Apple headphones with clear sound'},
    { id: 2, name: 'T-shirt', price: 45, quantity: 5, categoryId: 2, material: 'Cotton', color:'red', img: 'images/tshirt.jpg', dateAdded: new Date(2024,1,5), description: 'Comfortable cotton T-shirt'},
    { id: 3, name: 'Vase', price: 50, quantity: 8, categoryId: 3, material: 'Ceramic', color:'white', img: 'images/vase.jpg', dateAdded: new Date(2024,2,15), description: 'Decorative ceramic vase'},
    { id: 4, name: 'iPhone 16', price: 3700, quantity: 3, categoryId: 1, model: 'iPhone 16', color:'blue', img: 'images/phone.png', dateAdded: new Date(2024,3,20), description: 'Latest iPhone 16 Pro Max with advanced features'},
    { id: 5, name: 'Black jacket', price: 120, quantity: 5, categoryId: 2, color:'black', material: 'Leather', img: 'images/jacket.jpg', dateAdded: new Date(2024,4,25), description: 'Stylish black leather jacket'}
  ]);

  // Filtered view
  filteredProducts = signal<IProduct[]>([]);

  // Selected product (for details)
  selectedProduct = signal<IProduct | null>(null);
  showDetailsModal = signal(false);

  // Cart
  cartItems = signal<any[]>([]);
  creditCardNumber = signal('');

  // Buy now modal
  currentOrderProduct = signal<any>(null);
  showBuyNowModal = signal(false);

  // Categories
  categories = signal([
    { id: 0, name: 'All Categories' },
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Decor' }
  ]);

  // Order message
  orderMessage = signal('');

  constructor() {
    this.filteredProducts.set(this.products());
  }

  // --------- Filtering ----------
  updateFilteredProducts() {
    const term = this.searchTerm().toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p =>
        (this.selectedCategoryId() === 0 || p.categoryId === this.selectedCategoryId())
        && p.name.toLowerCase().includes(term)
      )
    );
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.updateFilteredProducts();
  }

  onCategoryChange(value: number | string) {
    this.selectedCategoryId.set(Number(value));
    this.updateFilteredProducts();
  }

  // --------- Cart ----------
  get cartItemCount(): number {
    return this.cartItems().reduce((sum, i) => sum + (i.cartQuantity || 0), 0);
  }

  getTotalPrice(): number {
    return this.cartItems().reduce((sum, i) => sum + (i.price * (i.cartQuantity || 0)), 0);
  }

  addToCart(product: IProduct) {
    if (!product || product.quantity <= 0) return;

    const existing = this.cartItems().find(i => i.id === product.id);
    if (existing) {
      if (product.quantity > 0) {
        existing.cartQuantity += 1;
        product.quantity -=1;
        this.cartItems.set([...this.cartItems()]);
      }
    } else {
      this.cartItems.set([...this.cartItems(), { ...product, cartQuantity: 1 }]);
      product.quantity -= 1;
    }
  }

  removeFromCart(item: any) {
    const product = this.products().find(p => p.id === item.id);
    if (product) product.quantity += item.cartQuantity;
    this.cartItems.set(this.cartItems().filter(i => i.id !== item.id));
  }

  // --------- Product Details ----------
  showDetails(product: IProduct) {
    this.selectedProduct.set(product);
    this.showDetailsModal.set(true);
    setTimeout(() => {
      const el = document.querySelector('.product-details-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  closeDetails() {
    this.selectedProduct.set(null);
    this.showDetailsModal.set(false);
  }

  // --------- Buy Now ----------
  buyNow(product?: any) {
    if (product) this.currentOrderProduct.set(product);
    else this.currentOrderProduct.set(null);
    this.showBuyNowModal.set(true);
  }

  closeBuyNow() {
    this.currentOrderProduct.set(null);
    this.showBuyNowModal.set(false);
  }

  formatCardNumber(value: string) {
    let digits = (value || '').replace(/\D/g, '').slice(0,16);
    digits = digits.match(/.{1,4}/g)?.join('-') || '';
    this.creditCardNumber.set(digits);
  }

  placeOrder() {
    const clean = this.creditCardNumber().replace(/\D/g, '');
    if (clean.length < 16) {
      this.orderMessage.set('Please enter a 16-digit credit card number.');
      return;
    }
    if (this.cartItems().length === 0) {
      this.orderMessage.set('Your cart is empty.');
      return;
    }

    const total = this.getTotalPrice();
    this.orderMessage.set(`Order placed successfully! Items: ${this.cartItemCount}, Total: ${total}`);

    this.cartItems.set([]);
    this.creditCardNumber.set('');
    this.showBuyNowModal.set(false);

    setTimeout(() => this.orderMessage.set(''), 5000);
  }

  getQuantityClass(p: IProduct): string {
    if (!p) return '';
    if (p.quantity === 0) return 'text-danger fw-bold';
    if (p.quantity === 1 || p.quantity === 2) return 'text-warning fw-bold';
    return 'text-success fw-bold';
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/default.png';
    target.alt = 'Image not available';
  }
}
