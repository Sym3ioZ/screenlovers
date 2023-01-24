import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(private router: Router) {}
  onHome(): void {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl('home');
  }
}
