namespace SkateShopAPI.ModelsAPI {
    public class TamanhoBody {
        public int? TamanhoID { get; set; }
        public int ProdutoID { get; set; }
        public string Nome { get; set; } = null!;
        public int Quantidade { get; set; }
    }
}
