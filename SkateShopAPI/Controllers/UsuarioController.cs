using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase {
        [HttpGet("{id}")]
        public RespostaAPI Get(int id) {
            var Headers = Request.Headers;
            Repository Repository = new Repository();
            var Usuario = Repository.FilterQuery<Usuario>(u => u.Usuario1 == id).Select((p) => new UsuarioRetorno {
                UsuarioID = p.Usuario1,
                Nome = p.Nome,
                Administrador = p.Administrador,
                CpfCnpj = p.CpfCnpj,
                Email = p.Email,
                lstEndereco = p.Enderecos.Select((e) => new EnderecoRetorno {
                    EnderecoID = e.Endereco1,
                    UF = e.Uf,
                    Cidade = e.Cidade,
                    Bairro = e.Bairro,
                    Rua = e.Rua,
                    Numero = e.Numero,
                    Complemento = e.Complemento
                }).ToList()
            }).FirstOrDefault();

            if (Usuario != null) {
                return new RespostaAPI("Registro não encontrado");
            }

            return new RespostaAPI(Usuario);
        }

        [HttpPost]
        public RespostaAPI Post(UsuarioBody UsuarioBody) {
            Usuario Usuario = new Usuario() {
                Nome = UsuarioBody.Nome,
                Email = UsuarioBody.Email,
                Senha = UsuarioBody.Senha,
                CpfCnpj = UsuarioBody.CpfCnpj
            };
            Repository Repository = new Repository();
            Repository.Insert(Usuario);

            return new RespostaAPI(new { sucesso = true });
        }

        [HttpPut]
        public RespostaAPI Put(UsuarioBody UsuarioBody) {
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

            return new RespostaAPI(new { sucesso = true });
        }
    }
}
