import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CustomersComponent } from "./customers/customers.component";
import { LoansComponent } from "./loans/loans.component";
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule,
    LoansComponent, CollectionsComponent,
    CustomersComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'troopers-money';
}
