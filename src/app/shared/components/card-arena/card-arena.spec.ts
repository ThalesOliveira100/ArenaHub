import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArena } from './card-arena';

describe('CardArena', () => {
  let component: CardArena;
  let fixture: ComponentFixture<CardArena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArena],
    }).compileComponents();

    fixture = TestBed.createComponent(CardArena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
