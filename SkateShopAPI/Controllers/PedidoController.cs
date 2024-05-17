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
            Repository Repository = new();
            var iqPedido = Repository.FilterQuery<Pedido>((p) => true);

            if (!Request.Headers.TryGetValue("ListaID", out var ListaID)) {
                return new RespostaAPI("Nenhum Pedido Encontrado");
            }

            var lstPedidoID = ListaID.First().Split(",").Select(int.Parse).ToList();

            if (lstPedidoID.Count == 1) {
                int PedidoID = lstPedidoID.First();
                iqPedido = iqPedido.Where((p) => p.Pedido1 == PedidoID);
            } else {
                iqPedido = iqPedido.Where((p) => lstPedidoID.Contains(p.Pedido1));
            }

            var lstPedido = iqPedido.Select((p) => new PedidoRetorno() {
                PedidoID = p.Pedido1,
                Valor = p.Valor,
                PagamentoRealizado = p.PagamentoRealizado,
                DataCriacao = p.DataCriacao,
                DataVencimento = p.DataVencimento,
                CodigoPagamentoPix = p.CodigoPagamentoPix,
                ImagemPagamentoPix = p.CaminhoRelativoImagemPix,
                ClienteNome = p.UsuarioNavigation.Nome
            }).ToList();

            Repository.Dispose();

            foreach (var Pedido in lstPedido) {
                Pedido.ImagemPagamentoPix = AnexoService.BuscarArquivoBase64(Pedido.ImagemPagamentoPix);
            }

            lstPedido = lstPedido.OrderByDescending(p => p.PedidoID).ToList();
            return new RespostaAPI(lstPedido);
        }

        [HttpGet("[Controller]ID/{id}")]
        public RespostaAPI GetPedidoID(int id) {
            Repository Repository = new();
            var iqPedido = Repository.FilterQuery<Pedido>((p) => true);

            if (Request.Headers.TryGetValue("admin", out var admin)) {
                iqPedido = iqPedido.Where((p) => p.PagamentoRealizado);
            } else {
                iqPedido = iqPedido.Where((p) => p.Usuario == id);
            }

            var lstPedidoID = iqPedido.Select((p) => p.Pedido1).ToList();
            lstPedidoID = lstPedidoID.OrderDescending().ToList();

            return new RespostaAPI(lstPedidoID);
        }

        [HttpGet("[Controller]Produto/{id}")]
        public RespostaAPI GetPedidoProduto(int id) {
            Repository Repository = new();
            var lstProduto = Repository.FilterQuery<PedidoProduto>((p) => p.Pedido == id).Select((p) => new PedidoProdutoRetorno() {
                ProdutoID = p.Produto,
                Nome = p.ProdutoNavigation.Nome,
                Quantidade = p.Quantidade,
                Valor = p.Valor,
                TamanhoNome = p.TamanhoNavigation.Nome,
                CaminhoImagem = p.ProdutoNavigation.Anexos.First().CaminhoRelativo
            }).ToList();
            Repository.Dispose();

            foreach (var Produto in lstProduto)
            {
                if (Produto.CaminhoImagem is not null) {
                    Produto.CaminhoImagem = AnexoService.BuscarArquivoBase64(Produto.CaminhoImagem);
                }
            }
            return new RespostaAPI(lstProduto);
        }

        [HttpPost("[Controller]")]
        public async Task<RespostaAPI> PostPedido(PedidoBody PedidoBody) {
            Repository Repository = new();

            var Usuario = Repository.FilterQuery<Usuario>((p) => p.Usuario1 == PedidoBody.UsuarioID).FirstOrDefault();

            if (Usuario == null) {
                return new RespostaAPI("Usuario inválido");
            }

            AsaasService.CriarCobrancaDados DadosCriarCobranca = new() {
                UsuarioAsaasID = Usuario.IdAsaas,
                Valor = PedidoBody.ListaProduto.Sum(p => p.Valor * p.Quantidade)
            };

            AsaasService.DadosCobranca DadosCobranca = await AsaasService.CriarCobrança(DadosCriarCobranca);

            if (Usuario == null) {
                return new RespostaAPI("Erro integração asaas");
            }

            Pedido Pedido = new () {
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
                Quantidade = p.Quantidade,
                Valor = p.Valor
            }).ToList();

            Repository.Insert(ListaProdutoSalvar);

            List<int> lstProdutoID = ListaProdutoSalvar.Where((p) => !p.Tamanho.HasValue).Select((p) => p.Produto).ToList();
            List<int> lstTamanhoID = ListaProdutoSalvar.Where((p) => p.Tamanho.HasValue).Select((p) => p.Tamanho.Value).ToList();

            List<Produto> lstProdutoUpdate = new List<Produto>();
            List<Tamanho> lstTamanhoUpdate = new List<Tamanho>();

            if (lstProdutoID.Any()) {
                lstProdutoUpdate = Repository.FilterQuery<Produto>((p) => lstProdutoID.Contains(p.Produto1)).ToList();
            }

            if (lstTamanhoID.Any()) { 
                lstTamanhoUpdate = Repository.FilterQuery<Tamanho>((p) => lstTamanhoID.Contains(p.Tamanho1)).ToList();
            }

            foreach (Produto produto in lstProdutoUpdate) {
                int quantidade = ListaProdutoSalvar.Where(p => p.Produto == produto.Produto1).Select(p => p.Quantidade).FirstOrDefault();
                produto.QuantidadeEstoque -= quantidade;
            }
            
            foreach (Tamanho tamanho in lstTamanhoUpdate) {
                int quantidade = ListaProdutoSalvar.Where(p => p.Tamanho == tamanho.Tamanho1).Select(p => p.Quantidade).FirstOrDefault();
                tamanho.Quantidade -= quantidade;
            }

            Repository.Update(lstProdutoUpdate);
            Repository.Update(lstTamanhoUpdate);

            Repository.Dispose();
            PedidoRetorno PedidoRetorno = new() {
                PedidoID = Pedido.Pedido1,
                Valor = Pedido.Valor,
                PagamentoRealizado = Pedido.PagamentoRealizado,
                DataCriacao = Pedido.DataCriacao,
                DataVencimento = Pedido.DataVencimento,
                CodigoPagamentoPix = Pedido.CodigoPagamentoPix,
                ImagemPagamentoPix = AnexoService.BuscarArquivoBase64(Pedido.CaminhoRelativoImagemPix)
            };
            return new RespostaAPI(PedidoRetorno);
        }
    }
}
