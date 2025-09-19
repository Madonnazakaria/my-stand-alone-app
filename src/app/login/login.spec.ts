import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  // دالة تسجيل الدخول
  login() {
    if (this.form.valid) {
      console.log('Login data:', this.form.value);
      alert('Login Successful ✅');
    } else {
      this.form.markAllAsTouched();
    }
  }

  // إظهار/إخفاء الباسورد
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // عمل reset للفورم
  resetForm() {
    this.form.reset();
  }
}
