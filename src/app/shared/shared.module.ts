import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { RouterModule } from '@angular/router';
import { EnvService } from '../services/env/env.service';
import { AuthService } from '../services/security/auth.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, RouterModule, CommonModule],
  exports: [HttpClientModule, CommonModule],
  providers: [PostService,EnvService, AuthService],
})
export class SharedModule {}
