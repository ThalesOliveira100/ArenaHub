import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGrade } from './basic-grade';

describe('BasicGrade', () => {
  let component: BasicGrade;
  let fixture: ComponentFixture<BasicGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicGrade],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicGrade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
