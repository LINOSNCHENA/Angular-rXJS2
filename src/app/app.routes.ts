import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoansComponent } from './loans/loans.component';
import { CollectionsComponent } from './collections/collections.component';
import { HomeComponent } from './home/home.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CustomersComponent } from './customers/customers.component';
import { UserComponent } from './entrance/user/user.component';

export const routes:  Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },    
    { path: 'customers', component: CustomersComponent },
    { path: 'loans', component: LoansComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'user', component: UserComponent },
    { path: 'tabs', component: TabsComponent },
    { path: '', redirectTo: '/user', pathMatch: 'full' }
  ];