namespace SkateShopAPI.ModelsAPI {
    public class PedidoBody {
        public int UsuarioID { get; set; }
        public int EnderecoID { get; set;}
        public List<PedidoProdutoBody> ListaProduto { get; set;} = new List<PedidoProdutoBody>();
    }
    
    public class PedidoProdutoBody {
        public int ProdutoID { get; set; }
        public int? TamanhoID { get; set;}
        public int Quantidade { get; set;}
        public decimal Valor { get; set;}
    }
}
