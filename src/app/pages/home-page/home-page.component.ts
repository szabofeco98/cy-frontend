import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Routes } from 'src/app/enums/router.enum';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  private authService = inject(AuthenticationService);

  private router = inject(Router);

  public onLogOut(): void {
    this.authService.logOut();
    this.router.navigate([Routes.WELCOME]);
  }
}
