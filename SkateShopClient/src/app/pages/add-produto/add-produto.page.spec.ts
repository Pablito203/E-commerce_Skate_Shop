import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProdutoPage } from './add-produto.page';

describe('AddProdutoPage', () => {
  let component: AddProdutoPage;
  let fixture: ComponentFixture<AddProdutoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
