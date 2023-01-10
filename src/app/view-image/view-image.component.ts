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
  movieId!: number;

  uniqueMovie$!: Observable<any>;

  ngOnInit(): void {
    this.imageUrl = this.route.snapshot.params['imageUrl']; // Retrieving imageUrl from URL parameters
    this.movieId = +this.route.snapshot.params['id']; // Retrieving movie from previous page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.uniqueMovie$ = this.service.getUniqueMovie(this.movieId);
  }

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
