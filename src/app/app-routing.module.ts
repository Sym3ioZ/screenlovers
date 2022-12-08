import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'singlemovie/:id', component: SingleMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
