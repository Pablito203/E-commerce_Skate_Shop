using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class LoginController : ControllerBase {
        [HttpPost]
        public RespostaAPI PostLogin(LoginBody LoginBody) {
            LoginBody.SetSenhaHash();

            Repository Repository = new();
            var Usuario = Repository.FilterQuery<Usuario>((p) => p.Email == LoginBody.Email && p.Senha == LoginBody.Senha).Select((p) => new LoginRetorno() {
                UsuarioID = p.Usuario1,
                Nome = p.Nome,
                Administrador = p.Administrador,
                Cpf = p.Cpf,
                Email = p.Email
            }).FirstOrDefault();
            Repository.Dispose();

            if (Usuario == null) {
                return new RespostaAPI("Login ou senha incorretos");
            }

            return new RespostaAPI(Usuario);
        }
    }
}
