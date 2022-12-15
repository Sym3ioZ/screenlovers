import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { ViewImageComponent } from './view-image/view-image.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'singlemovie/:id', component: SingleMovieComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'viewimage/:id/:imageUrl', component: ViewImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
