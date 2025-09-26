import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home';
import { AboutUsComponent } from './about-us/about-us';
import { ContactUsComponent } from './contact-us/contact-us';
import { ProductsComponent } from './products/products';
import { NotFoundComponent } from './not-found/not-found';
import { ClockComponent } from './clock/clock';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';

import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductsComponent,
    NotFoundComponent,
    ClockComponent,
    LoginComponent,
    RegisterComponent
  ],
template: `
  <!-- ✅ Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">My Store</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Links -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" routerLink="/home" routerLinkActive="active">Home</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/about-us" routerLinkActive="active">About Us</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/contact-us" routerLinkActive="active">Contact</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/search-products" routerLinkActive="active">Search</a></li>
        </ul>

        <!-- Right side buttons -->
        <div class="d-flex">
          <button class="btn btn-outline-light me-2" (click)="toggleClock()">
            <i class="bi bi-clock"></i>
            {{ showClock ? 'Hide Clock' : 'Show Clock' }}
          </button>

          <button *ngIf="!auth.isLoggedIn()" class="btn btn-light me-2" routerLink="/login">Login</button>
          <button *ngIf="!auth.isLoggedIn()" class="btn btn-light me-2" routerLink="/register">Register</button>
          <button *ngIf="auth.isLoggedIn()" class="btn btn-danger" (click)="logout()">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <!--  Clock Component -->
  <div class="container mt-3" *ngIf="showClock">
    <app-clock></app-clock>
  </div>

  <!--  Page Content -->
  <main class="container mt-3">
    <router-outlet></router-outlet>
  </main>
`
})
export class AppComponent {
  searchTerm = '';
  showClock = true;

  constructor(public auth: AuthService, private router: Router) {}
logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleClock() {
    this.showClock = !this.showClock;
  }

  searchPage() {
    const page = this.searchTerm.toLowerCase().trim();

    switch(page) {
      case 'home':
        this.router.navigate(['/']);
        break;
      case 'about':
      case 'about us':
        this.router.navigate(['/about-us']);
        break;
      case 'contact':
      case 'contact us':
        this.router.navigate(['/contact-us']);
        break;
      case 'products':
        this.router.navigate(['/products']);
        break;
      default:
        this.router.navigate(['/not-found']);
    }

    this.searchTerm = '';
  }
}
