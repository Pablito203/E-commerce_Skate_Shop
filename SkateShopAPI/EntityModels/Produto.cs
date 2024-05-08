using System;
using System.Collections.Generic;

namespace SkateShopAPI.EntityModels;

public partial class Produto
{
    public int Produto1 { get; set; }

    public string Nome { get; set; } = null!;

    public decimal Valor { get; set; }

    public DateTime DataCriacao { get; set; }

    public bool Ativo { get; set; }

    public bool Destaque { get; set; }

    public int QuantidadeEstoque { get; set; }

    public bool? TamanhoUnico { get; set; }

    public virtual ICollection<Anexo> Anexos { get; set; } = new List<Anexo>();

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();

    public virtual ICollection<Tamanho> Tamanhos { get; set; } = new List<Tamanho>();
}
