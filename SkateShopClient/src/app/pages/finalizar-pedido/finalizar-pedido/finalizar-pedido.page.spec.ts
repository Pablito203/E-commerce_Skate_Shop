import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarPedidoPage } from './finalizar-pedido.page';

describe('FinalizarPedidoPage', () => {
  let component: FinalizarPedidoPage;
  let fixture: ComponentFixture<FinalizarPedidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalizarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
