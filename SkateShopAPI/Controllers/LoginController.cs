using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class LoginController : ControllerBase {
        [HttpPost]
        public RespostaAPI PostLogin(LoginBody LoginBody) {
            Repository Repository = new Repository();
            var Usuario = Repository.FilterQuery<Usuario>((p) => p.Email == LoginBody.Email && p.Senha == LoginBody.Senha).Select((p) => new LoginRetorno() {
                UsuarioID = p.Usuario1,
                Nome = p.Nome
            }).FirstOrDefault();

            if (Usuario == null) {
                return new RespostaAPI("Login ou senha incorretos");
            }

            return new RespostaAPI(Usuario);
        }
    }
}
