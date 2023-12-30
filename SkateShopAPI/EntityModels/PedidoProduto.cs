using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class PedidoProduto
{
    public int PedidoProduto1 { get; set; }

    public int Pedido { get; set; }

    public int Produto { get; set; }

    public decimal Valor { get; set; }

    public int? Tamanho { get; set; }

    public virtual Pedido PedidoNavigation { get; set; } = null!;

    public virtual Produto ProdutoNavigation { get; set; } = null!;

    public virtual Tamanho? TamanhoNavigation { get; set; }
}
