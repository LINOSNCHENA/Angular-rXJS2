import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInForm, SessionData } from '../../services/model.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  loading = false;
  sessionData: SessionData | null = null;
  sessionDatad: any;

  form = this._formBuilder.group<LogInForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sessionData = this.authService.getSessionDataFromLocalStorage();
    if (this.sessionData) {
      this._router.navigate(['analytics']);
    } else {
      this.authService.session3().subscribe({
        next: (data: SessionData) => {
          this.sessionData = data;
          console.log('Session Data:', this.sessionData);
          if (this.sessionData.session.access_token) {
            this._router.navigate(['user']);
          }
        },
        error: (err) => {
          console.error('Error fetching session data:', err);
        }
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      alert('Form is invalid');
      return;
    }
    try {
      this.loading = true;
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const { error } = await this._authService.signInWithPassword(email, password);
      if (error) throw error;
      const session = await this._authService.session();
      if (session) { this.sessionDatad = session;  this._router.navigate(['user']); }
    } catch (error) {
      if (error instanceof Error) { console.error('Login error:', error.message); }
    } finally {
      this.form.reset();
      this.loading = false;
    }
  }
}
