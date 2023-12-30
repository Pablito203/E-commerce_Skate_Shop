namespace SkateShopAPI.ModelsAPI {
    public class TamanhoRetorno {
        public int TamanhoID { get; set; }
        public string Nome { get; set; } = null!;
        public int Quantidade { get; set; }
        public bool PossuiPedido { get; set; }
    }
}
