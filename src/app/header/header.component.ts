import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // On clicking ? link
  onDiscover() {
    this.router.navigateByUrl('');
  }

  // On clicking Home link
  onHomePage() {
    this.router.navigateByUrl('home');
  }
}
