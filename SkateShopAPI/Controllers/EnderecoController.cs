using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class EnderecoController : ControllerBase {

        [HttpGet("{id}")]
        public RespostaAPI GetEndereco(int id) {
            Repository Repository = new Repository();

            var lstEndereco = Repository.FilterQuery<Endereco>((p) => p.Usuario == id).Select((p) => new EnderecoRetorno {
                EnderecoID = p.Endereco1,
                UF = p.Uf,
                Cidade = p.Cidade,
                Bairro = p.Bairro,
                Rua = p.Rua,
                Numero = p.Numero,
                Complemento = p.Complemento
            }).ToList();

            return new RespostaAPI(lstEndereco);
        }

        [HttpPost]
        public RespostaAPI PostEndereco(EnderecoBody EnderecoBody) {
            if (!(EnderecoBody.PedidoID.HasValue || EnderecoBody.UsuarioID.HasValue)) {
                return new RespostaAPI("Registro relacionado não encontrado");
            }

            Endereco Endereco = new Endereco() {
                Uf = EnderecoBody.UF,
                Cidade = EnderecoBody.Cidade,
                Bairro = EnderecoBody.Bairro,
                Rua = EnderecoBody.Rua,
                Numero = EnderecoBody.Numero,
                Complemento = EnderecoBody.Complemento
            };

            if (EnderecoBody.UsuarioID.HasValue) {
                Endereco.Usuario = EnderecoBody.UsuarioID;
            }

            if (EnderecoBody.PedidoID.HasValue) {
                Endereco.Pedido = EnderecoBody.PedidoID;
            }

            Repository Repository = new Repository();

            try {
                Repository.Insert(Endereco);

                return new RespostaAPI(new { sucesso = true });
            } catch {
                return new RespostaAPI("Registro relacionado não encontrado");
            }
        }
        
        [HttpPut]
        public RespostaAPI PutEndereco(EnderecoBody EnderecoBody) {
            if (!EnderecoBody.EnderecoID.HasValue) {
                return new RespostaAPI("Registro não encontrado");
            }

            Repository Repository = new Repository();

            var Endereco = Repository.FilterQuery<Endereco>((p) => p.Endereco1 == EnderecoBody.EnderecoID).FirstOrDefault();

            if (Endereco is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (Endereco.Pedido.HasValue) {
                return new RespostaAPI("Não é possível editar um endereço com pedido vinculado");
            }

            Endereco.Uf = EnderecoBody.UF;
            Endereco.Cidade = EnderecoBody.Cidade;
            Endereco.Bairro = EnderecoBody.Bairro;
            Endereco.Rua = EnderecoBody.Rua;
            Endereco.Numero = EnderecoBody.Numero;
            Endereco.Complemento = EnderecoBody.Complemento;

            Repository.Update(Endereco);

            return new RespostaAPI(new { sucesso = true });
        }

        [HttpDelete("{id}")]
        public RespostaAPI DeleteEndereco(int id) {
            Repository Repository = new Repository();

            var Endereco = Repository.FilterQuery<Endereco>((p) => p.Endereco1 == id).FirstOrDefault();

            if (Endereco is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (Endereco.Pedido.HasValue) {
                return new RespostaAPI("Não é possível excluir um endereço com pedido vinculado");
            }

            Repository.Delete(Endereco);

            return new RespostaAPI(new { sucesso = true });
        }
    }
}
