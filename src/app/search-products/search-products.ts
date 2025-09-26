import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-products.html'
})
export class SearchProductsComponent {
  query = '';
  results: any[] = [];
  loading = false;

  constructor(private productsService: ProductsService) {}

  search() {
    if (!this.query.trim()) return;
    this.loading = true;
    this.productsService.search(this.query).subscribe({
      next: (res: any) => {
        this.results = res.products || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
