import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'produto-catalogo',
  templateUrl: './produto-catalogo.component.html',
  styleUrls: ['./produto-catalogo.component.scss'],
})
export class ProdutoCatalogoComponent  implements OnInit {

  Produto: any = {
    Nome: 'Shape element 8.0',
    CaminhoImagem: 'https://images.tcdn.com.br/img/img_prod/1013584/shape_element_section_805_1_62a06d7ff54a0f4c2ee0949781becdc0.jpg'
  }

  favorito = false;
  constructor() { }

  ngOnInit() {}

}
