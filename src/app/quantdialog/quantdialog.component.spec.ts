import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantdialogComponent } from './quantdialog.component';

describe('QuantdialogComponent', () => {
  let component: QuantdialogComponent;
  let fixture: ComponentFixture<QuantdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantdialogComponent]
    });
    fixture = TestBed.createComponent(QuantdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
