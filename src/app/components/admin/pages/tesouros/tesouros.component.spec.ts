import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourosComponent } from './tesouros.component';

describe('TesourosComponent', () => {
  let component: TesourosComponent;
  let fixture: ComponentFixture<TesourosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesourosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesourosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
