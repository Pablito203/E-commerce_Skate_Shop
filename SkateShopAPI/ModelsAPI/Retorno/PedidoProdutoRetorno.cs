namespace SkateShopAPI.ModelsAPI {
    public class PedidoProdutoRetorno {
        public int ProdutoID { get; set; }
        public required string Nome { get; set; }
        public required int Quantidade { get; set; }
        public required decimal Valor { get; set; }
        public string? TamanhoNome { get; set; }
        public required string CaminhoImagem { get; set; }
    }
}
