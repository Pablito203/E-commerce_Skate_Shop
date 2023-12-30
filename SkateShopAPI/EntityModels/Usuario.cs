using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Usuario
{
    public int Usuario1 { get; set; }

    public bool Administrador { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public string CpfCnpj { get; set; } = null!;

    public string? IdAsaas { get; set; }

    public virtual ICollection<Endereco> Enderecos { get; set; } = new List<Endereco>();

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
