using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Endereco
{
    public int Endereco1 { get; set; }

    public int? Usuario { get; set; }

    public int? Pedido { get; set; }

    public string Uf { get; set; } = null!;

    public string Cidade { get; set; } = null!;

    public string Bairro { get; set; } = null!;

    public string Rua { get; set; } = null!;

    public string Numero { get; set; } = null!;

    public string? Complemento { get; set; }

    public virtual Pedido? PedidoNavigation { get; set; }

    public virtual Usuario? UsuarioNavigation { get; set; }
}
