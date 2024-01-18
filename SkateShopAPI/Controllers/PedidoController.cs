using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using SkateShopAPI.ModelsAPI;
using SkateShopAPI.Services;

namespace SkateShopAPI.Controllers {

    [ApiController]
    [Route("api")]
    public class PedidoController : ControllerBase {

        [HttpGet("[Controller]")]
        public RespostaAPI GetPedido() {
            Repository Repository = new Repository();
            var iqPedido = Repository.FilterQuery<Pedido>((p) => true);

            if (!Request.Headers.TryGetValue("ListaID", out var ListaID)) {
                return new RespostaAPI("Nenhum Pedido Encontrado");
            }

            var lstPedidoID = ListaID.First().Split(",").Select(int.Parse).ToList();

            if (lstPedidoID.Count() == 1) {
                int PedidoID = lstPedidoID.First();
                iqPedido = iqPedido.Where((p) => p.Pedido1 == PedidoID);
            } else {
                iqPedido = iqPedido.Where((p) => lstPedidoID.Contains(p.Pedido1));
            }

            var lstProduto = iqPedido.Select((p) => new PedidoRetorno() {
                PedidoID = p.Pedido1,
                Valor = p.Valor,
                PagamentoRealizado = p.PagamentoRealizado,
                DataCriacao = p.DataCriacao,
                DataVencimento = p.DataVencimento,
                CodigoPagamentoPix = p.CodigoPagamentoPix,
                ImagemPagamentoPix = p.CaminhoRelativoImagemPix
            }).ToList();

            foreach (var Produto in lstProduto) {
                Produto.ImagemPagamentoPix = AnexoService.GetCaminhoAbsoluto(Produto.ImagemPagamentoPix);
            }

            return new RespostaAPI(lstProduto);
        }

        [HttpGet("[Controller]ID/{id}")]
        public RespostaAPI GetPedidoID(int id) {
            Repository Repository = new Repository();
            var lstPedidoID = Repository.FilterQuery<Pedido>((p) => p.Usuario == id).Select((p) => p.Pedido1).ToList();

            return new RespostaAPI(lstPedidoID);
        }

        [HttpGet("[Controller]Produto/{id}")]
        public RespostaAPI GetPedidoProduto(int id) {
            Repository Repository = new Repository();
            var lstProduto = Repository.FilterQuery<PedidoProduto>((p) => p.Pedido == id).Select((p) => new PedidoProdutoRetorno() {
                ProdutoID = p.Produto,
                Nome = p.ProdutoNavigation.Nome,
                Valor = p.Valor,
                TamanhoNome = p.TamanhoNavigation.Nome,
                CaminhoImagem = p.ProdutoNavigation.Anexos.First().CaminhoRelativo
            }).ToList();

            foreach (var Produto in lstProduto)
            {
                Produto.CaminhoImagem = AnexoService.GetCaminhoAbsoluto(Produto.CaminhoImagem);
            }
            return new RespostaAPI(lstProduto);
        }

        [HttpPost("[Controller]")]
        public async Task<RespostaAPI> PostPedido(PedidoBody PedidoBody) {
            Repository Repository = new Repository();

            var Usuario = Repository.FilterQuery<Usuario>((p) => p.Usuario1 == PedidoBody.UsuarioID).FirstOrDefault();

            if (Usuario == null) {
                return new RespostaAPI("Usuario inválido");
            }

            AsaasService.CriarCobrancaDados DadosCriarCobranca = new AsaasService.CriarCobrancaDados() {
                UsuarioAsaasID = Usuario.IdAsaas,
                Valor = PedidoBody.ListaProduto.Sum(p => p.Valor)
            };

            AsaasService.DadosCobranca DadosCobranca = await AsaasService.CriarCobrança(DadosCriarCobranca);

            Pedido Pedido = new Pedido() {
                Usuario = PedidoBody.UsuarioID,
                Endereco = PedidoBody.EnderecoID,
                IdAsaas = DadosCobranca.CobrancaAsaasID,
                DataCriacao = DateTime.Now,
                DataVencimento = DadosCobranca.DataVencimentoCobranca,
                Valor = DadosCriarCobranca.Valor,
                CodigoPagamentoPix = DadosCobranca.CodigoPagamentoPix,
                CaminhoRelativoImagemPix = DadosCobranca.CaminhoRelativoImagem
            };

            Repository.Insert(Pedido);

            List<PedidoProduto> ListaProdutoSalvar = PedidoBody.ListaProduto.Select((p) => new PedidoProduto() {
                Pedido = Pedido.Pedido1,
                Produto = p.ProdutoID,
                Tamanho = p.TamanhoID,
                Valor = p.Valor
            }).ToList();

            Repository.Insert(ListaProdutoSalvar);

            PedidoRetorno PedidoRetorno = new PedidoRetorno() {
                PedidoID = Pedido.Pedido1,
                Valor = Pedido.Valor,
                PagamentoRealizado = Pedido.PagamentoRealizado,
                DataCriacao = Pedido.DataCriacao,
                DataVencimento = Pedido.DataVencimento,
                CodigoPagamentoPix = Pedido.CodigoPagamentoPix,
                ImagemPagamentoPix = AnexoService.GetCaminhoAbsoluto(Pedido.CaminhoRelativoImagemPix)
            };
            return new RespostaAPI(PedidoRetorno);
        }
    }
}
