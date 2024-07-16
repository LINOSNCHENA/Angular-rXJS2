import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {


  selectedTab: string = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log(tab);
  }
}
