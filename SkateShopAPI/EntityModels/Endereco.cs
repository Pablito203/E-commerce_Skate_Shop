using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Endereco
{
    public int Endereco1 { get; set; }

    public int? Usuario { get; set; }

    public int? Pedido { get; set; }

    public decimal Valor { get; set; }

    public string IdAsaas { get; set; } = null!;

    public bool PagamentoRealizado { get; set; }

    public DateTime DataCriacao { get; set; }

    public DateTime DataVencimento { get; set; }

    public virtual Pedido? PedidoNavigation { get; set; }

    public virtual Usuario? UsuarioNavigation { get; set; }
}
