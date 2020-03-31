import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabReportsComponent } from './tab-reports.component';

describe('TabReportsComponent', () => {
  let component: TabReportsComponent;
  let fixture: ComponentFixture<TabReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
