import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionData } from '../../services/model.model';

interface LogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

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
  dataX!: SessionData;

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
lastObject: any;
sessionStatus2: any;

  constructor(private authService: AuthService) {}
  sessionData: SessionData | null = null;
  sessionActive: any | null = null;

  ngOnInit(): void {

    this.authService.session2().subscribe({
      next: (data: SessionData) => {
        this.sessionData = data;
        console.log('Session Data:', this.sessionData);
      },
      error: err => {
        console.error('Error fetching session data:', err);
      }
    });

   this.sessionActive= this.authService.getSessionDataFromLocalStorage()   ;
   alert(' ACTIVE SESSION  : ' + this.sessionActive);

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
      if (session) {
        alert('User authenticated, session data: ' + JSON.stringify(session));
        this.lastObject=session
        this._router.navigate(['user']);
      } else {
        alert('User not authenticated, no session data available.');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.error('Login error:', error.message); // Log the error message
      }
    } finally {
      this.form.reset();
      this.loading = false;
    }
  }
}
