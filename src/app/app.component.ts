import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CustomersComponent } from "./customers/customers.component";
import { LoansComponent } from "./loans/loans.component";
import { SharedModule } from './shared/model/shared.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from "./entrance/login/login.component";
import { UserComponent } from './entrance/user/user.component';
import { SessionData } from './services/model.model';
import { AuthService } from './services/security/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule,
    RouterLink, RouterLinkActive, LoansComponent,CommonModule,
    CollectionsComponent, TabsComponent, HeaderComponent,
    LoginComponent, UserComponent, CustomersComponent,
    HomeComponent, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'troopers-money';

  sessionUser: any;
  sessionData: SessionData | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.session3().subscribe(
      (data: SessionData) => {
        this.sessionData = data;
        console.log('Session Data:', this.sessionData);
        let x = String(this.sessionData.session.user.email) ?? 'Non'
        this.sessionUser=x.toLocaleUpperCase();
      },
      (error) => {
        console.error('Error fetching session data:', error);
      }
    );
  }

}
