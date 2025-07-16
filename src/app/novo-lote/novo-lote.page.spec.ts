import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoLotePage } from './novo-lote.page';

describe('NovoLotePage', () => {
  let component: NovoLotePage;
  let fixture: ComponentFixture<NovoLotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoLotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
