using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;
using SkateShopAPI.Services;

namespace SkateShopAPI.Controllers {

    [ApiController]
    [Route("api/[Controller]")]
    public class FavoritosController : ControllerBase {

        [HttpGet("{id}")]
        public RespostaAPI GetFavoritos(int id) {
            Repository repository = new();

            var lstProduto = repository.FilterQuery<Favorito>((p) => p.Usuario == id && p.ProdutoNavigation.Ativo).Select(p => new ProdutoRetorno() {
                ProdutoID = p.ProdutoNavigation.Produto1,
                Nome = p.ProdutoNavigation.Nome,
                Valor = p.ProdutoNavigation.Valor,
                Ativo = p.ProdutoNavigation.Ativo,
                Destaque = p.ProdutoNavigation.Destaque,
                QuantidadeEstoque = p.ProdutoNavigation.QuantidadeEstoque,
                TamanhoUnico = p.ProdutoNavigation.TamanhoUnico,
                CaminhoImagem = p.ProdutoNavigation.Anexos.Select((p) => p.CaminhoRelativo).FirstOrDefault(),
            }).ToList();

            repository.Dispose();

            foreach (var Produto in lstProduto) {
                if (Produto.CaminhoImagem is not null) {
                    Produto.CaminhoImagem = AnexoService.BuscarArquivoBase64(Produto.CaminhoImagem);
                }
            }

            return new RespostaAPI(lstProduto);
        }

        [HttpPost]
        public RespostaAPI PostFavoritos(FavoritoBody favoritoBody) {
            Repository Repository = new();

            var favorito = Repository.FilterQuery<Favorito>((p) => p.Produto == favoritoBody.ProdutoID && p.Usuario == favoritoBody.UsuarioID).FirstOrDefault();

            if (favorito is not null) {
                Repository.Dispose();
                return new RespostaAPI(new { sucesso = true });
            }

            Favorito favoritoInsert = new Favorito() {
                Produto = favoritoBody.ProdutoID,
                Usuario = favoritoBody.UsuarioID
            };

            try {
                Repository.Insert(favoritoInsert);
            } catch (Exception ex) {
                return new RespostaAPI("Registro não encontrado");
            } finally {
                Repository.Dispose();
            }

            return new RespostaAPI(new { sucesso = true });
        }

        [HttpPut]
        public RespostaAPI PutFavoritos(FavoritoBody favoritoBody) {
            Repository Repository = new();

            var favorito = Repository.FilterQuery<Favorito>((p) => p.Produto == favoritoBody.ProdutoID && p.Usuario == favoritoBody.UsuarioID).FirstOrDefault();

            if (favorito == null) {
                Repository.Dispose();
                return new RespostaAPI(new { sucesso = true });
            }

            Repository.Delete(favorito);

            Repository.Dispose();

            return new RespostaAPI(new { sucesso = true });
        }

    }
}
