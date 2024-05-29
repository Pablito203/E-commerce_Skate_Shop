using SkateShopAPI.Services;

namespace SkateShopAPI.ModelsAPI {
    public class LoginBody {
        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;

        public void SetSenhaHash() {
            this.Senha = Senha.GerarHash();
        }
    }
}
