import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public uniqueMovie$!: Observable<any>;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.uniqueMovie$ = this.http.get<object>(
      'https://api.themoviedb.org/3/movie/829280?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR'
    );
    setTimeout(() => {
      console.log(this.uniqueMovie$);
    }, 5000);
  }
}
