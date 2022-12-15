import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  actualDate: Date = new Date();
  randomNumber!: number;
  randomYear!: number;
  randomPreDate!: string;
  randomPostDate!: string;

  getUniqueMovie(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve movie data from ID
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getUniqueMovieCredits(movieId: number): Observable<any> {
    // Fetching TMB API to retrieve full movie credits from ID
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getUniqueMovieCrew(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve credits and map them to get an array with only the directors
    return this.getUniqueMovieCredits(movieId).pipe(
      map((array) => array.crew),
      map((crewArray) =>
        crewArray.filter(
          (element: { job: string }) => element.job === 'Director'
        )
      )
    );
  }

  getUniqueMovieWriters(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve credits and map them to get an array with only the writers
    return this.getUniqueMovieCredits(movieId).pipe(
      map((array) => array.crew),
      map((crewArray) =>
        crewArray.filter(
          (element: { job: string }) =>
            element.job === 'Writer' || element.job === 'Story'
        )
      ),
      map((value) => {
        if (value.length === 0) return null;
        else return value;
      })
    );
  }

  getRandomMovie(): Observable<any> {
    // Establishing a random date within the last 100 years
    this.randomNumber = Math.floor(Math.random() * 100);
    this.randomYear = this.actualDate.getFullYear() - (this.randomNumber + 1);
    this.randomPreDate = new Date(
      (this.actualDate.getMonth() === 0
        ? this.randomYear - 1
        : this.randomYear) +
        '-' +
        (this.actualDate.getMonth() === 0 ? 12 : this.actualDate.getMonth()) +
        '-' +
        this.actualDate.getDate()
    ).toISOString();
    this.randomPostDate = new Date(
      (this.actualDate.getMonth() === 11
        ? this.randomYear + 1
        : this.randomYear) +
        '-' +
        (this.actualDate.getMonth() === 11
          ? 1
          : this.actualDate.getMonth() + 2) +
        '-' +
        this.actualDate.getDate()
    ).toISOString();
    // Fetching TMDB API to get a list of movies released within the gap defined, and with a minimum average note
    return this.http.get<object>(
      `https://api.themoviedb.org/3/discover/movie?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&primary_release_date.gte=${this.randomPreDate}&primary_release_date.lte=${this.randomPostDate}&vote_average.gte=7&include_adult=false`
    );
  }

  getUniqueMovieTrailer(movieId: number): Observable<any> {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=032445021a055e1fc596f3292981c16d`
      )
      .pipe(
        map((obj) => obj.results),
        map((array) =>
          array.filter(
            (element: { type: string }) => element.type === 'Trailer'
          )
        ),
        tap((value) => console.log(value))
      );
  }

  getUniqueMoviePosters(movieId: number): Observable<any> {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=032445021a055e1fc596f3292981c16d`
      )
      .pipe(map((obj) => obj.posters));
  }

  getUniqueMovieWallpapers(movieId: number): Observable<any> {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=032445021a055e1fc596f3292981c16d`
      )
      .pipe(map((obj) => obj.backdrops));
  }

  getTrendingMovies(): Observable<any> {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=032445021a055e1fc596f3292981c16d&language=fr'
      )
      .pipe(
        map((obj) => obj.results),
        map((results) => {
          let array = [];
          for (let i = 0; i < 9; i++) {
            array.push(results[i]);
          }
          return array;
        })
      );
  }

  getTrendingPeople(): Observable<any> {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/trending/person/day?api_key=032445021a055e1fc596f3292981c16d'
      )
      .pipe(
        map((obj) => obj.results),
        tap((value) => console.log(value)),
        map((results) => {
          let array = [];
          for (let i = 0; i < 9; i++) {
            array.push(results[i]);
          }
          return array;
        })
      );
  }
}
