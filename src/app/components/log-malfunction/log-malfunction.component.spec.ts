import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMalfunctionComponent } from './log-malfunction.component';

describe('LogMalfunctionComponent', () => {
  let component: LogMalfunctionComponent;
  let fixture: ComponentFixture<LogMalfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMalfunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMalfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
