import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  enterSite(): void {
    document.getElementById('disclaimer')!.style.display = 'none';
    document.getElementById('loading')!.style.display = 'flex';
  }
}
