import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CustomersComponent } from "./customers/customers.component";
import { LoansComponent } from "./loans/loans.component";
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule, RouterLink, RouterLinkActive,
    LoansComponent, CollectionsComponent, TabsComponent, HeaderComponent,
    CustomersComponent, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'troopers-money';

  appName = import.meta.env.NG_APP_NAMES;
  appVersion = import.meta.env.NG_APP_VERSION;
  appModel = import.meta.env.NG_APP_MODEL;
  appXXX = import.meta.env.NG_APP_XXX;

  url = import.meta.env.NG_APP_SUP_URL;
  key = import.meta.env.NG_APP_SUP_KEY;
}
