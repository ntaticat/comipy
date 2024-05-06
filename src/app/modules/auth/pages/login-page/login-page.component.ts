import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.loginForm.valid) {
      const formData = {
        ...this.loginForm.value,
      };
      this.authService.postLogin(formData).subscribe();
    }
  }
}
