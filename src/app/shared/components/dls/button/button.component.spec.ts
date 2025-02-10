import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniButtonComponent } from './button.component';

describe('ViniButtonComponent', () => {
  let component: ViniButtonComponent;
  let fixture: ComponentFixture<ViniButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViniButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViniButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
