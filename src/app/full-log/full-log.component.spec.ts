import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLogComponent } from './full-log.component';

describe('FullLogComponent', () => {
  let component: FullLogComponent;
  let fixture: ComponentFixture<FullLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
