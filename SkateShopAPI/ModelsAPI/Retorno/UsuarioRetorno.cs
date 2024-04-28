namespace SkateShopAPI.ModelsAPI {
    public class UsuarioRetorno {
        public int UsuarioID { get; set; }
        public bool Administrador { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Cpf { get; set; } = null!;
    }
}
