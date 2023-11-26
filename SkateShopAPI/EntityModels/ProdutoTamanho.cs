using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class ProdutoTamanho
{
    public int ProdutoTamanho1 { get; set; }

    public int Produto { get; set; }

    public string? Nome { get; set; }

    public int Quantidade { get; set; }

    public virtual Produto ProdutoNavigation { get; set; } = null!;
}
