import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
})
export class SearchProductsComponent {
  searchTerm = '';
  products: any[] = [];
  loading = false;
  searched = false;
  selectedProduct: any = null;

  constructor(private productsService: ProductsService) {}

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.loading = true;
    this.searched = true;
    this.productsService.search(this.searchTerm).subscribe({
      next: (res) => {
        this.products = res.products || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error while searching:', err);
        this.loading = false;
      }
    });
  }

  showDetails(product: any) {
    this.selectedProduct = product;

    // افتح الـ modal باستخدام Bootstrap JS
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}

