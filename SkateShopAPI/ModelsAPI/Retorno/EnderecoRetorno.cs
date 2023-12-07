namespace SkateShopAPI.ModelsAPI {
    public class EnderecoRetorno {
        public int EnderecoID { get; set; }
        public string UF { get; set; } = null!;
        public string Cidade { get; set; } = null!;
        public string Bairro { get; set; } = null!;
        public string Rua { get; set; } = null!;
        public string Numero { get; set; } = null!;
        public string? Complemento { get; set; }
    }
}
