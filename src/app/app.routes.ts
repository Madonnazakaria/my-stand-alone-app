import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutUsComponent } from './about-us/about-us';
import { ContactUsComponent } from './contact-us/contact-us';
import { ProductsComponent } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { NotFoundComponent } from './not-found/not-found';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { GuestGuard } from './guards/guest.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetails },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'search-products', loadComponent: () => import('./search-products/search-products').then(m => m.SearchProductsComponent) },
  { path: '**', component: NotFoundComponent },
];

