using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class UsuarioFavorito
{
    public int UsuarioFavorito1 { get; set; }

    public int Usuario { get; set; }

    public int Produto { get; set; }

    public virtual Produto ProdutoNavigation { get; set; } = null!;

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
