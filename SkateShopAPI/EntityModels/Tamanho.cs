using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Tamanho
{
    public int Tamanho1 { get; set; }

    public int Produto { get; set; }

    public string Nome { get; set; } = null!;

    public int Quantidade { get; set; }

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();

    public virtual Produto ProdutoNavigation { get; set; } = null!;
}
