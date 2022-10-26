import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesouroComponent } from './tesouro.component';

describe('TesouroComponent', () => {
  let component: TesouroComponent;
  let fixture: ComponentFixture<TesouroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesouroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesouroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
