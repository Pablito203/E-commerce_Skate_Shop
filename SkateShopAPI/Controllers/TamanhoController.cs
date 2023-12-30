using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;

namespace SkateShopAPI.Controllers {

    [ApiController]
    [Route("api/[Controller]")]
    public class TamanhoController {

        [HttpGet("{id}")]
        public RespostaAPI GetTamanho(int id) {
            Repository Repository = new Repository();

            var lstTamanho = Repository.FilterQuery<Tamanho>((p) => p.Produto == id).Select((p) => new TamanhoRetorno {
                TamanhoID = p.Tamanho1,
                Nome = p.Nome,
                Quantidade = p.Quantidade,
                PossuiPedido = p.PedidoProdutos.Any()
            }).ToList();

            return new RespostaAPI(lstTamanho);
        }

        [HttpPost]
        public RespostaAPI PostEndereco(TamanhoBody TamanhoBody) {
            if (!TamanhoBody.ProdutoID.HasValue) {
                return new RespostaAPI("Registro relacionado não encontrado");
            }

            Tamanho Tamanho = new Tamanho() {
                Produto = TamanhoBody.TamanhoID.Value,
                Nome = TamanhoBody.Nome,
                Quantidade = TamanhoBody.Quantidade
            };

            Repository Repository = new Repository();

            try {
                Repository.Insert(Tamanho);

                return new RespostaAPI(new { sucesso = true });
            }
            catch {
                return new RespostaAPI("Registro relacionado não encontrado");
            }
        }
        
        [HttpPut]
        public RespostaAPI PutEndereco(TamanhoBody TamanhoBody) {
            if (!TamanhoBody.TamanhoID.HasValue) {
                return new RespostaAPI("Registro não encontrado");
            }
            Repository Repository = new Repository();

            var Tamanho = Repository.FilterQuery<Tamanho>((p) => p.Tamanho1 == TamanhoBody.TamanhoID).FirstOrDefault();

            var TamanhoDados = Repository.FilterQuery<Tamanho>((p) => p.Tamanho1 == TamanhoBody.TamanhoID).Select((p) => new {
                Tamanho = p,
                PossuiPedido = p.PedidoProdutos.Any(),
            }).FirstOrDefault();

            if (TamanhoDados is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (!TamanhoDados.PossuiPedido) { 
                TamanhoDados.Tamanho.Nome = TamanhoBody.Nome;
            }

            TamanhoDados.Tamanho.Quantidade = TamanhoBody.Quantidade;

            try {
                Repository.Update(TamanhoDados.Tamanho);

                return new RespostaAPI(new { sucesso = true });
            }
            catch {
                return new RespostaAPI("Registro relacionado não encontrado");
            }
        }

        [HttpDelete("{id}")]
        public RespostaAPI DeleteTamanho(int id) {
            Repository Repository = new Repository();

            var TamanhoDados = Repository.FilterQuery<Tamanho>((p) => p.Tamanho1 == id).Select((p) => new {
                Tamanho = p,
                PossuiPedido = p.PedidoProdutos.Any(),
            }).FirstOrDefault();

            if (TamanhoDados is null) {
                return new RespostaAPI("Registro não encontrado");
            }

            if (TamanhoDados.PossuiPedido) {
                return new RespostaAPI("Não é possível excluir um tamanho com pedido vinculado");
            }

            Repository.Delete(TamanhoDados.Tamanho);

            return new RespostaAPI(new { sucesso = true });
        }
    }
}
