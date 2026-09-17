import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraView } from './quadra-view';

describe('QuadraView', () => {
  let component: QuadraView;
  let fixture: ComponentFixture<QuadraView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraView],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
