import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatetxtComponent } from './animatetxt.component';

describe('AnimatetxtComponent', () => {
  let component: AnimatetxtComponent;
  let fixture: ComponentFixture<AnimatetxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatetxtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatetxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
