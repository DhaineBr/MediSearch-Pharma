import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentlyDeleteComponent } from './permanently-delete.component';

describe('PermanentlyDeleteComponent', () => {
  let component: PermanentlyDeleteComponent;
  let fixture: ComponentFixture<PermanentlyDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermanentlyDeleteComponent]
    });
    fixture = TestBed.createComponent(PermanentlyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
