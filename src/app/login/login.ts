import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // fakestore expects username
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() { this.showPassword = !this.showPassword; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const creds = this.loginForm.value;
    this.auth.login(creds).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      }
    });
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
  }
}

