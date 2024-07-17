import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '../nested/dashboard/dashboard.component';
import { UserComponent } from "../entrance/user/user.component";

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, DashboardComponent, UserComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  selectedTab: string = 'tab10';
  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log(tab);
  }
}
