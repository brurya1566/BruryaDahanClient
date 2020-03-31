import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMalDialogComponent } from './show-mal-dialog.component';

describe('ShowMalDialogComponent', () => {
  let component: ShowMalDialogComponent;
  let fixture: ComponentFixture<ShowMalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
