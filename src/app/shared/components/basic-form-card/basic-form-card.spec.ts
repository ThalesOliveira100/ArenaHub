import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFormCard } from './basic-form-card';

describe('BasicFormCard', () => {
  let component: BasicFormCard;
  let fixture: ComponentFixture<BasicFormCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicFormCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicFormCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
