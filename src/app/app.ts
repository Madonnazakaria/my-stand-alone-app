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
    <!-- Top Bar with Clock -->
    <header class="bg-primary text-white p-2 d-flex justify-content-between align-items-center">
      <h2 class="m-0">My Store</h2>
      <button class="btn btn-light btn-sm me-2" (click)="toggleClock()">
        {{ showClock ? 'Hide Clock' : 'Show Clock' }}
      </button>
      <app-clock *ngIf="showClock"></app-clock>
    </header>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/about-us">About Us</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contact-us">Contact Us</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/register">Register</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
          </ul>

          <!-- Search -->
          <form class="d-flex" (submit)="searchPage(); $event.preventDefault()">
            <input class="form-control me-2" type="search" placeholder="Search pages..." [(ngModel)]="searchTerm" name="searchTerm">
            <button class="btn btn-outline-primary" type="submit">Go</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- Router Outlet -->
    <main class="container mb-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  searchTerm = '';
  showClock = true;

  constructor(private router: Router) {}

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

