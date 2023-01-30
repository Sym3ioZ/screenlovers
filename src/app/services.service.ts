import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable, elementAt } from 'rxjs';

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

  getUniquePeople(peopleId: number): Observable<any> {
    // Fetching TMDB API to retrieve unique person details
    return this.http.get<object>(
      `https://api.themoviedb.org/3/person/${peopleId}?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR`
    );
  }

  getUniquePeopleImages(peopleId: number): Observable<any> {
    // Fetching TMDB API to retrieve unique person images
    return this.http.get<object>(
      `https://api.themoviedb.org/3/person/${peopleId}/images?api_key=032445021a055e1fc596f3292981c16d`
    );
  }

  getUniquePeopleMovies(peopleId: number, dept: string): Observable<any> {
    // Fetching TMDB API to retrieve movies from a unique person, and filter them to display only 6 best movies
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR`
      )
      .pipe(
        map((array) =>
          dept === 'Acting'
            ? array.cast
            : array.crew.filter(
                (element: { department: string }) => element.department === dept
              )
        ),
        map((fullArray) =>
          fullArray.filter(
            (element: { vote_average: number }) => element.vote_average > 7
          )
        ),
        map((filteredArray) => filteredArray.slice(0, 6))
      );
  }

  getPeopleAllMovies(peopleId: number): Observable<any> {
    // Fetching TMDB API to retrieve all movies from one unique person
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR`
      )
      .pipe(
        // Joining cast and crew arrays, also filtering crew array to retrieve only impoortant movies (as director or writer)
        map((value) =>
          value.cast.concat(
            value.crew.filter(
              (element: { department: string }) =>
                element.department === ('Writing' || 'Story' || 'Directing')
            )
          )
        ),
        // Checking the newly created array to delete duplicate values
        map((array) => {
          for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
              if (array[i].id === array[j].id) {
                array.splice(j, 1);
              }
            }
          }
          return array;
        }),
        // Sorting the final array by release date
        map((value) =>
          value.sort((a: any, b: any) =>
            a.release_date < b.release_date ? 1 : -1
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

    // Fetching TMDB API to get a list of movies released within the gap defined, and with a minimum average note
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/discover/movie?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&primary_release_year=${this.randomYear}&watch_region=FR&include_adult=false&include_video=true&with_original_language=fr|en&without_keywords=softcore|hardcore|porn|porno|erotic|sex|sexual|erotica|gay`
      )
      .pipe(
        map((value) => value.results),
        map((value) => {
          let array = [];
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].poster_path &&
              (value[i].original_language === 'en' || 'fr')
            ) {
              array.push(value[i]);
            }
          }
          return array;
        })
      );
  }

  getUniqueMovieTrailer(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve a trailer from the actual movie
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
        )
      );
  }

  getUniqueMoviePosters(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve all movie posters
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=032445021a055e1fc596f3292981c16d`
      )
      .pipe(map((obj) => obj.posters));
  }

  getUniqueMovieWallpapers(movieId: number): Observable<any> {
    // Fetching TMDB API to retrieve all movie wallpapers (backdrops)
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=032445021a055e1fc596f3292981c16d`
      )
      .pipe(map((obj) => obj.backdrops));
  }

  getTrendingMovies(): Observable<any> {
    // Fetching TMDB API to retrieve trending movies, then keep only first 9 results
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=032445021a055e1fc596f3292981c16d&language=fr&include_adult=false'
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
    // Fetching TMDB API to retrieve trending people, then keep only first 9 results
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/trending/person/day?api_key=032445021a055e1fc596f3292981c16d&include_adult=false'
      )
      .pipe(
        map((obj) => obj.results),
        map((value) =>
          value.sort((a: any, b: any) => (a.popularity < b.popularity ? 1 : -1))
        ),
        map((results) => {
          let array = [];
          for (let i = 0; i < 9; i++) {
            array.push(results[i]);
          }
          return array;
        })
      );
  }

  searchMovie(query: string, page: number): Observable<any> {
    // Fetching TMDB API to query a search for movies with a string, and a page number meaning the page of results to display
    return this.http.get<Object>(
      `https://api.themoviedb.org/3/search/movie?api_key=032445021a055e1fc596f3292981c16d&query=${query}&page=${page}&language=fr-FR&include_adult=false`
    );
  }

  searchPeople(query: string, page: number): Observable<any> {
    // Fetching TMDB API to query a search for people with a string, and a page number meaning the page of results to display
    return this.http.get<Object>(
      `https://api.themoviedb.org/3/search/person?api_key=032445021a055e1fc596f3292981c16d&query=${query}&page=${page}&language=fr-FR&include_adult=false`
    );
  }
}
