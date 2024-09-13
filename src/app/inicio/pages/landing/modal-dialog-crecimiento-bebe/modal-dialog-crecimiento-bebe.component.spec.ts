import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogCrecimientoBebeComponent } from './modal-dialog-crecimiento-bebe.component';

describe('ModalDialogCrecimientoBebeComponent', () => {
  let component: ModalDialogCrecimientoBebeComponent;
  let fixture: ComponentFixture<ModalDialogCrecimientoBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDialogCrecimientoBebeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDialogCrecimientoBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
