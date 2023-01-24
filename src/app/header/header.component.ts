import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuToggle!: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.menuToggle = false;
    } else {
      this.menuToggle = true;
    }
  }

  // On clicking ? link
  onDiscover() {
    window.scrollTo({ top: 0 });
    this.toggleMenu();
    this.router.navigateByUrl('');
  }

  // On clicking Home link
  onHomePage() {
    window.scrollTo({ top: 0 });
    this.toggleMenu();
    this.router.navigateByUrl('home');
  }

  // On clicking search link
  onSearch(): void {
    window.scrollTo({ top: 0 });
    this.toggleMenu();
    this.router.navigateByUrl('search');
  }

  // On clicking contact link
  onContact(): void {
    window.scrollTo({ top: 0 });
    this.toggleMenu();
    this.router.navigateByUrl('contact');
  }

  // On clicking, toggles burger menu ON/OFF
  toggleMenu(): void {
    if (this.menuToggle) {
      let header = document.getElementById('header');
      let bar1 = document.getElementById('bar1');
      let bar2 = document.getElementById('bar2');
      let arrows = document.getElementById('burgerArrows');

      bar1!.style.top = '0%';
      bar2!.style.top = '42.5%';
      arrows!.style.top = '-125%';
      document.body.style.overflowY = '';
      // document.body.style.paddingRight = '';
      header!.style.transform = 'translateY(-100vh) translateX(-100vw)';
      window.setTimeout(() => {
        this.menuToggle = !this.menuToggle;
      }, 500);
    } else {
      let bar1 = document.getElementById('bar1');
      let bar2 = document.getElementById('bar2');
      let arrows = document.getElementById('burgerArrows');

      bar1!.style.top = '85%';
      bar2!.style.top = '85%';
      arrows!.style.top = '0';
      document.body.style.overflowY = 'hidden';
      // if (+document.body.offsetHeight > window.innerHeight) {
      //   document.body.style.paddingRight = '10px';
      // }

      this.menuToggle = !this.menuToggle;
      window.setTimeout(() => {
        let header = document.getElementById('header');
        header!.style.transform = 'translateY(0) translateX(0)';
      }, 50);
    }
  }
}
