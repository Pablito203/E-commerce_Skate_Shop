namespace SkateShopAPI.ModelsAPI {
    public class LoginRetorno {
        public int UsuarioID { get; set; }
        public string Nome { get; set; } = null!;
        public bool Administrador { get; set; } = false;
        public string Cpf { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
