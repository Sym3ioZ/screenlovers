import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  uniqueMovie$!: Observable<any>;
  uniqueMovieCredits$!: Observable<any>;
  uniqueMovieCrew$!: Observable<any>;
  uniqueMovieWriters$!: Observable<any>;
  uniqueMovieTrailer$!: Observable<any>;
  uniqueMoviePosters$!: Observable<any>;
  uniqueMovieWallpapers$!: Observable<any>;

  castToggle!: boolean;
  crewToggle!: boolean;
  writersToggle!: boolean;
  trailerToggle!: boolean;
  postersToggle!: boolean;
  wallpapersToggle!: boolean;
  zoomToggle!: boolean;

  posterUrl: string = 'https://image.tmdb.org/t/p/w500';
  trailerUrl: string = 'https://www.youtube.com/embed/';
  youtubeSearchUrl: string = 'https://www.youtube.com/results?search_query=';

  constructor(
    private service: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.castToggle = false;
    this.crewToggle = false;
    this.writersToggle = false;
    this.trailerToggle = true;
    this.postersToggle = false;
    this.wallpapersToggle = false;
    this.zoomToggle = false;

    const movieId = +this.route.snapshot.params['id']; // Retrieving movieId from URL parameters
    this.uniqueMovie$ = this.service.getUniqueMovie(movieId); // Assigning movie to observable
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(movieId); // Assigning full credits to obersvable
    this.uniqueMovieCrew$ = this.service.getUniqueMovieCrew(movieId); // Assigning directors only to observable (array)
    this.uniqueMovieWriters$ = this.service.getUniqueMovieWriters(movieId); // Assigning directors only to observable (array)
    this.uniqueMovieTrailer$ = this.service.getUniqueMovieTrailer(movieId); // Assigning movie trailers to observable (array)
    this.uniqueMoviePosters$ = this.service.getUniqueMoviePosters(movieId); // Assigning movie posters to observable (array)
    this.uniqueMovieWallpapers$ =
      this.service.getUniqueMovieWallpapers(movieId); // Assigning movie wallpapers to observable (array)
  }

  seeMoreCast(): void {
    // Toggle to display or not full actors list
    this.castToggle = !this.castToggle;
  }
  seeMoreCrew(): void {
    // Toggle to display or not full directors list
    this.crewToggle = !this.crewToggle;
  }
  seeMoreWriters(): void {
    // Toggle to display or not full writers list
    this.writersToggle = !this.writersToggle;
  }

  tabToggle(tab: string): void {
    if (tab === 'trailer' && !this.trailerToggle) {
      this.trailerToggle = !this.trailerToggle;
      this.postersToggle = false;
      this.wallpapersToggle = false;
    } else if (tab === 'posters' && !this.postersToggle) {
      this.trailerToggle = false;
      this.postersToggle = !this.postersToggle;
      this.wallpapersToggle = false;
    } else if (tab === 'wallpapers' && !this.wallpapersToggle) {
      this.trailerToggle = false;
      this.postersToggle = false;
      this.wallpapersToggle = !this.wallpapersToggle;
    }
  }

  onViewImage(imageUrl: string) {
    this.router.navigateByUrl(`viewimage/${imageUrl}`);
  }

  onGetPeople(peopleId: number): any {
    this.router.navigateByUrl(`singlepeople/${peopleId}`);
  }

  onTmdbLink(movieId: number): void {
    this.router.navigateByUrl(`https://www.themoviedb.org/movie/${movieId}`);
  }
}
