import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArenaNotFound } from './card-arena-not-found';

describe('CardArenaNotFound', () => {
  let component: CardArenaNotFound;
  let fixture: ComponentFixture<CardArenaNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArenaNotFound],
    }).compileComponents();

    fixture = TestBed.createComponent(CardArenaNotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
