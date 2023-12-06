namespace SkateShopAPI.ModelsAPI {
    public class UsuarioBody {
        public int? UsuarioID { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;
        public string CpfCnpj { get; set; } = null!;
    }
}
