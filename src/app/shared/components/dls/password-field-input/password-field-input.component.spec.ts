import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniPasswordFieldInputComponent } from './password-field-input.component';

describe('ViniPasswordFieldInputComponent', () => {
  let component: ViniPasswordFieldInputComponent;
  let fixture: ComponentFixture<ViniPasswordFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViniPasswordFieldInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViniPasswordFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
