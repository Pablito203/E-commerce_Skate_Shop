namespace SkateShopAPI.ModelsAPI {
    public class PedidoRetorno {
        public int PedidoID { get; set; }
        public decimal Valor { get; set; }
        public bool PagamentoRealizado { get; set; }
        public DateTime DataCriacao { get; set; }

        public DateTime DataVencimento { get; set; }
        public string? CodigoPagamentoPix { get; set; }
        public string? ImagemPagamentoPix { get; set; }
        public string ClienteNome { get; set; } = string.Empty;
    }
}
