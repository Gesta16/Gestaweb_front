import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogEjercicioComponent } from './modal-dialog-ejercicio.component';

describe('ModalDialogEjercicioComponent', () => {
  let component: ModalDialogEjercicioComponent;
  let fixture: ComponentFixture<ModalDialogEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDialogEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDialogEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
