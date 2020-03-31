import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCenterComponent } from './server-center.component';

describe('ServerCenterComponent', () => {
  let component: ServerCenterComponent;
  let fixture: ComponentFixture<ServerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
