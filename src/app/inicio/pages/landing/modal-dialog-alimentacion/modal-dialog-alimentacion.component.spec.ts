import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogAlimentacionComponent } from './modal-dialog-alimentacion.component';

describe('ModalDialogAlimentacionComponent', () => {
  let component: ModalDialogAlimentacionComponent;
  let fixture: ComponentFixture<ModalDialogAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDialogAlimentacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDialogAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
