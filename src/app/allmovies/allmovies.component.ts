import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.scss'],
})
export class AllmoviesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private router: Router
  ) {}
  people$!: Observable<any>;
  castMovies$!: Observable<any>;
  crewMovies$!: Observable<any>;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    const peopleId = +this.route.snapshot.params['id'];
    this.people$ = this.service.getUniquePeople(peopleId);
    this.castMovies$ = this.service.getPeopleAllMovies(peopleId);
  }

  onGetUniqueMovie(movieId: number): void {
    this.router.navigateByUrl(`singlemovie/${movieId}`);
  }

  onGetUniquePeople(peopleId: number): void {
    this.router.navigateByUrl(`singlepeople/${peopleId}`);
  }
}
