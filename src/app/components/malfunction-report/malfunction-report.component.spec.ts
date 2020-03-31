import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionReportComponent } from './malfunction-report.component';

describe('MalfunctionReportComponent', () => {
  let component: MalfunctionReportComponent;
  let fixture: ComponentFixture<MalfunctionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfunctionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
