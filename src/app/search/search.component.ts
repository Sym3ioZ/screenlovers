import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  selectedChoice = 'movie';
  textValue = '';
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';
  movieSearch$!: Observable<any>;
  peopleSearch$!: Observable<any>;

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {}

  choiceChanger(event: any): void {
    this.selectedChoice = event.target.value;
  }

  textChanger(event: any): void {
    this.textValue = event.target.value;
  }

  search(page: number): void {
    if (this.selectedChoice === 'movie') {
      this.movieSearch$ = this.service.searchMovie(this.textValue, page);
    } else {
      this.peopleSearch$ = this.service.searchPeople(this.textValue, page);
    }
  }

  onGetMovie(movieId: number): void {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl(`singlemovie/${movieId}`);
  }

  onGetPeople(peopleId: number): void {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl(`singlepeople/${peopleId}`);
  }
}
