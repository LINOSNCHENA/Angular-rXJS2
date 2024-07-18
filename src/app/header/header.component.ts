import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/security/auth.service';
import { SessionData } from '../services/model.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  lastObject: any;
  sessionUser: any;
  sessionData: SessionData | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.session3().subscribe(
      (data: SessionData) => {
        this.sessionData = data;
        console.log('Session Data:', this.sessionData);
        this.sessionUser = String(this.sessionData.session.user.email) ?? 'Non'
      },
      (error) => {
        console.error('Error fetching session data:', error);
      }
    );
  }
}
