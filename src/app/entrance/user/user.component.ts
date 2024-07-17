import { Component } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import { SessionData } from '../../services/model.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  lastObject: any;
  sessionStatus2: any;

  // constructor(private authService: AuthService) { }
  // sessionData: SessionData | null = null;
  // sessionActive: any | null = null;

  // ngOnInit(): void {

  //   this.authService.session2().subscribe({
  //     next: (data: SessionData) => {
  //       this.sessionData = data;
  //       console.log('Session Data:', this.sessionData);
  //     },
  //     error: err => {
  //       console.error('Error fetching session data:', err);
  //     }
  //   });

  //   this.sessionActive = this.authService.getSessionDataFromLocalStorage();
  //   alert(' ACTIVE SESSION  : ' + this.sessionActive);
  // }



  sessionData: SessionData | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.session3().subscribe(
      (data: SessionData) => {
        this.sessionData = data;
        console.log('Session Data:', this.sessionData);
      },
      (error) => {
        console.error('Error fetching session data:', error);
      }
    );
  }

}
