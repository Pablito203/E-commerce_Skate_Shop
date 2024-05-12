import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnderecoCadastroComponent } from './endereco-cadastro.component';

describe('EnderecoCadastroComponent', () => {
  let component: EnderecoCadastroComponent;
  let fixture: ComponentFixture<EnderecoCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoCadastroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
