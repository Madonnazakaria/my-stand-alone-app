import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer bg-dark text-light text-center p-3 mt-4">
      <p>&copy; 2025 My Store. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      bottom: 0;
      width: 100%;
      font-size: 14px;
    }
  `]
})
export class FooterComponent {}
