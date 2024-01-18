using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Pedido
{
    public int Pedido1 { get; set; }

    public int Usuario { get; set; }

    public int Endereco { get; set; }

    public decimal Valor { get; set; }

    public string IdAsaas { get; set; } = null!;

    public bool PagamentoRealizado { get; set; }

    public DateTime DataCriacao { get; set; }

    public DateTime DataVencimento { get; set; }

    public string CodigoPagamentoPix { get; set; } = null!;

    public string CaminhoRelativoImagemPix { get; set; } = null!;

    public virtual Endereco EnderecoNavigation { get; set; } = null!;

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
