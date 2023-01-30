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

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.imageUrl = this.route.snapshot.params['imageUrl']; // Retrieving imageUrl from URL parameters
  }

  // On clicking download button, funtion to create download url, then simulate an "a" tag with download action automatically
  downloadPoster() {
    fetch(this.posterUrl + this.imageUrl, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl;
        aTag.download = 'affiche';
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      })
      .catch((error) => {
        alert(
          "Erreur serveur: réessayez plus tard ou clic droit et 'enregistrer l'image sous.'"
        );
      });
  }

  back(): void {
    history.back();
  }
}
