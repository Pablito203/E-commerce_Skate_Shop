using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class EnderecoController : ControllerBase {

        [HttpGet("{id}")]
        public RespostaAPI GetEndereco(int id) {
            if (id == 0)
            {
                return new RespostaAPI("Usuário inválido");
            }

            Repository Repository = new();

            var lstEndereco = Repository.FilterQuery<Endereco>((p) => p.Usuario == id).Select((p) => new EnderecoRetorno {
                EnderecoID = p.Endereco1,
                UF = p.Uf,
                Cidade = p.Cidade,
                Bairro = p.Bairro,
                Rua = p.Rua,
                Numero = p.Numero,
                Complemento = p.Complemento
            }).ToList();

            Repository.Dispose();
            return new RespostaAPI(lstEndereco);
        }

        [HttpPost]
        public RespostaAPI PostEndereco(EnderecoBody EnderecoBody) {
            if (!EnderecoBody.UsuarioID.HasValue) {
                return new RespostaAPI("Registro relacionado não encontrado");
            }

            Endereco Endereco = new() {
                Uf = EnderecoBody.UF,
                Cidade = EnderecoBody.Cidade,
                Bairro = EnderecoBody.Bairro,
                Rua = EnderecoBody.Rua,
                Numero = EnderecoBody.Numero,
                Complemento = EnderecoBody.Complemento,
                Usuario = EnderecoBody.UsuarioID.Value
            };

            Repository Repository = new();

            try {
                Repository.Insert(Endereco);

                EnderecoRetorno enderecoRetorno = new EnderecoRetorno {
                    EnderecoID = Endereco.Endereco1,
                    UF = Endereco.Uf,
                    Cidade = Endereco.Cidade,
                    Bairro = Endereco.Bairro,
                    Rua = Endereco.Rua,
                    Numero = Endereco.Numero,
                    Complemento = Endereco.Complemento
                };

                return new RespostaAPI(enderecoRetorno);
            } catch {
                return new RespostaAPI("Registro relacionado não encontrado");
            } finally { Repository.Dispose(); }
        }
        
        [HttpPut]
        public RespostaAPI PutEndereco(EnderecoBody EnderecoBody) {
            if (!EnderecoBody.EnderecoID.HasValue) {
                return new RespostaAPI("Registro não encontrado");
            }

            Repository Repository = new();

            var EnderecoDados = Repository.FilterQuery<Endereco>((p) => p.Endereco1 == EnderecoBody.EnderecoID).Select((p) => new {
                Endereco = p,
                PossuiPedido = p.Pedidos.Any(),
            }).FirstOrDefault();

            if (EnderecoDados is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (EnderecoDados.PossuiPedido) {
                return new RespostaAPI("Não é possível editar um endereço com pedido vinculado");
            }

            Endereco Endereco = EnderecoDados.Endereco;

            Endereco.Uf = EnderecoBody.UF;
            Endereco.Cidade = EnderecoBody.Cidade;
            Endereco.Bairro = EnderecoBody.Bairro;
            Endereco.Rua = EnderecoBody.Rua;
            Endereco.Numero = EnderecoBody.Numero;
            Endereco.Complemento = EnderecoBody.Complemento;

            Repository.Update(Endereco);
            Repository.Dispose();
            return new RespostaAPI(new { sucesso = true });
        }

        [HttpDelete("{id}")]
        public RespostaAPI DeleteEndereco(int id) {
            Repository Repository = new();

            var EnderecoDados = Repository.FilterQuery<Endereco>((p) => p.Endereco1 == id).Select((p) => new {
                Endereco = p,
                PossuiPedido = p.Pedidos.Any(),
            }).FirstOrDefault();

            if (EnderecoDados is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (EnderecoDados.PossuiPedido) {
                return new RespostaAPI("Não é possível excluir um endereço com pedido vinculado");
            }

            Repository.Delete(EnderecoDados.Endereco);
            Repository.Dispose();
            return new RespostaAPI(new { sucesso = true });
        }
    }
}
