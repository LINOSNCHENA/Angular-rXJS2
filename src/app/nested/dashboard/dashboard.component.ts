import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  title="Records of Access Data";
  appName = import.meta.env.NG_APP_NAMES;
  appVersion = import.meta.env.NG_APP_VERSION;
  appModel = import.meta.env.NG_APP_MODEL;
  appXXX = import.meta.env.NG_APP_XXX;

  url = import.meta.env.NG_APP_SUP_URL;
  key = import.meta.env.NG_APP_SUP_KEY;

}
