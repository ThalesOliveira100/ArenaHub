import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicButton } from './basic-button';

describe('BasicButton', () => {
  let component: BasicButton;
  let fixture: ComponentFixture<BasicButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicButton],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
