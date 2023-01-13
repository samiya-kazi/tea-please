import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderFormComponent } from './confirm-order-form.component';

describe('ConfirmOrderFormComponent', () => {
  let component: ConfirmOrderFormComponent;
  let fixture: ComponentFixture<ConfirmOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
