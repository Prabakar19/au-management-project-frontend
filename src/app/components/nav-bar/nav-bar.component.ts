import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/Services/Auth/auth-guard.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private authGuargService: AuthGuardService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    console.log('log out');
    this.authGuargService.logout();
    this.router.navigateByUrl('/login');
  }
}
