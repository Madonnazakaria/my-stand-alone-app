import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loggedUser: any = null;
showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loggedUser = this.loginForm.value;
    this.loginForm.reset();
    this.submitted = false;
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
  }
}

