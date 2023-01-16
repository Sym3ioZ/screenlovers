import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchComponent } from './search/search.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { SinglePeopleComponent } from './single-people/single-people.component';
import { ViewImageComponent } from './view-image/view-image.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'singlemovie/:id', component: SingleMovieComponent },
  { path: 'singlepeople/:id', component: SinglePeopleComponent },
  { path: 'singlepeople/:id/allmovies', component: AllmoviesComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'viewimage/:id/:imageUrl', component: ViewImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
