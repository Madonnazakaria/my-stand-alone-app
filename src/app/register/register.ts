import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      mobiles: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)])
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatch });
  }

  get mobiles() {
    return this.form.get('mobiles') as FormArray;
  }

  addMobile() {
    this.mobiles.push(this.fb.control('', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]));
  }

  removeMobile(index: number) {
    this.mobiles.removeAt(index);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatch(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    if (this.form.valid) {
      alert('Registration Success ✅\n' + JSON.stringify(this.form.value, null, 2));
      this.form.reset();
    }
  }

  resetForm() {
    this.form.reset();
    while (this.mobiles.length > 1) {
      this.mobiles.removeAt(1);
    }
  }
}
