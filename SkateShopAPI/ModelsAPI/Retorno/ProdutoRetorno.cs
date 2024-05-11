namespace SkateShopAPI.ModelsAPI {
    public class ProdutoRetorno {
        public int ProdutoID { get; set; }
        public string Nome { get; set; } = null!;
        public decimal Valor { get; set; }
        public bool Ativo { get; set; }
        public bool Destaque { get; set; }
        public int QuantidadeEstoque { get; set; }
        public bool? TamanhoUnico { get; set; }
        public string? CaminhoImagem { get; set; }
        public bool Favorito { get; set; }
        public int Tipo { get; set; }
    }
}
