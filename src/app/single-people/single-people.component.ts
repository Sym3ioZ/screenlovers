import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-single-people',
  templateUrl: './single-people.component.html',
  styleUrls: ['./single-people.component.scss'],
})
export class SinglePeopleComponent implements OnInit {
  uniquePeople$!: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    const peopleId = +this.route.snapshot.params['id'];
    this.uniquePeople$ = this.service.getUniquePeople(peopleId);
  }
}
