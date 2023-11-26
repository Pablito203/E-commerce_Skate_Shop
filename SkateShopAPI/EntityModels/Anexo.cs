using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Anexo
{
    public int Anexo1 { get; set; }

    public int Produto { get; set; }

    public string? Nome { get; set; }

    public string? CaminhoRelativo { get; set; }

    public virtual Produto ProdutoNavigation { get; set; } = null!;
}
