namespace SkateShopAPI.ModelsAPI {
    public class EnderecoBody {
        public int? EnderecoID { get; set; }
        public int? UsuarioID { get; set; }
        public string UF { get; set; } = null!;
        public string Cidade { get; set; } = null!;
        public string Bairro { get; set; } = null!;
        public string Rua { get; set; } = null!;
        public string Numero { get; set; } = null!;
        public string? Complemento { get; set; }
    }
}
