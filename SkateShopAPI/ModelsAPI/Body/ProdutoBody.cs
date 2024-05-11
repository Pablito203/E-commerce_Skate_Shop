namespace SkateShopAPI.ModelsAPI {
    public class ProdutoBody {
        public int? ProdutoID { get; set; }
        public string Nome { get; set; } = null!;
        public decimal Valor { get; set; }
        public bool Destaque { get; set; }
        public int QuantidadeEstoque { get; set; }
        public bool? TamanhoUnico { get; set; }
        public int Tipo { get; set; }
    }
}
