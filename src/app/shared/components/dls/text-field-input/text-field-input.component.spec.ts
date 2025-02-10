import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniTextFieldInputComponent } from './text-field-input.component';

describe('ViniTextFieldInputComponent', () => {
  let component: ViniTextFieldInputComponent;
  let fixture: ComponentFixture<ViniTextFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViniTextFieldInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViniTextFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
