import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container">
      <h1>Home</h1>
      <div class="card">
        <p>Welcome to our online store. Explore our products and enjoy shopping!</p>
      </div>
    </div>
  `
})
export class HomeComponent {}
