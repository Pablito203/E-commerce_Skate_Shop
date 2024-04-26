using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;
using SkateShopAPI.Services;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase {
        [HttpGet("{id}")]
        public RespostaAPI GetUsuario(int id) {
            var Headers = Request.Headers;
            Repository Repository = new Repository();
            var Usuario = Repository.FilterQuery<Usuario>(u => u.Usuario1 == id).Select((p) => new UsuarioRetorno {
                UsuarioID = p.Usuario1,
                Nome = p.Nome,
                CpfCnpj = p.CpfCnpj,
                Email = p.Email
            }).FirstOrDefault();
            Repository.Dispose();

            if (Usuario is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            return new RespostaAPI(Usuario);
        }

        [HttpPost]
        public async Task<RespostaAPI> PostUsuarioAsync(UsuarioBody UsuarioBody) {
            Usuario Usuario = new Usuario() {
                Nome = UsuarioBody.Nome,
                Email = UsuarioBody.Email,
                Senha = UsuarioBody.Senha,
                CpfCnpj = UsuarioBody.CpfCnpj
            };

            bool ClienteAsaasCriado = await AsaasService.CriarCliente(Usuario);

            if (!ClienteAsaasCriado) {
                return new RespostaAPI("Erro integração asaas");
            }

            Repository Repository = new Repository();
            Repository.Insert(Usuario);
            Repository.Dispose();

            return new RespostaAPI(new { sucesso = true });
        }

        [HttpPut]
        public RespostaAPI PutUsuario(UsuarioBody UsuarioBody) {
            if (UsuarioBody.UsuarioID is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            Repository Repository = new Repository();

            var Usuario = Repository.FilterQuery<Usuario>((p) => p.Usuario1 == UsuarioBody.UsuarioID).FirstOrDefault();

            if (Usuario is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (Usuario.Senha != UsuarioBody.Senha) {
                return new RespostaAPI("Senha incorreta");
            }

            Usuario.Nome = UsuarioBody.Nome;
            Usuario.Email = UsuarioBody.Email;
            Usuario.CpfCnpj = UsuarioBody.CpfCnpj;

            Repository.Update(Usuario);
            Repository.Dispose();

            return new RespostaAPI(new { sucesso = true });
        }
    }
}
