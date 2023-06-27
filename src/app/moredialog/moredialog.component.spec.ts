import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoredialogComponent } from './moredialog.component';

describe('MoredialogComponent', () => {
  let component: MoredialogComponent;
  let fixture: ComponentFixture<MoredialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoredialogComponent]
    });
    fixture = TestBed.createComponent(MoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
