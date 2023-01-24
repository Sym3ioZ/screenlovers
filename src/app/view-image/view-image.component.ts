import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss'],
})
export class ViewImageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServicesService
  ) {}

  posterUrl: string = 'https://image.tmdb.org/t/p/original/';
  imageUrl!: string;

  ngOnInit(): void {
    this.imageUrl = this.route.snapshot.params['imageUrl']; // Retrieving imageUrl from URL parameters
  }

  // On clicking download button, funtion to create download url, then simulate an "a" tag with download action automatically
  downloadPoster() {
    fetch('https://proxy.cors.sh/' + this.posterUrl + this.imageUrl)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl;
        aTag.download = 'affiche';
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  }

  back(): void {
    history.back();
  }
}
