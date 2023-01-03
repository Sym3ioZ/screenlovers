import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePeopleComponent } from './single-people.component';

describe('SinglePeopleComponent', () => {
  let component: SinglePeopleComponent;
  let fixture: ComponentFixture<SinglePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
