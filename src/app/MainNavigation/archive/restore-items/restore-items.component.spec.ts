import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreItemsComponent } from './restore-items.component';

describe('RestoreItemsComponent', () => {
  let component: RestoreItemsComponent;
  let fixture: ComponentFixture<RestoreItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreItemsComponent]
    });
    fixture = TestBed.createComponent(RestoreItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
