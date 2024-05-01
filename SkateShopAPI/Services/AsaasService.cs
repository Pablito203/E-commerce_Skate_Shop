using RestSharp;
using SkateShopAPI.EntityModels;
using System.Text.Json;

namespace SkateShopAPI.Services {
    public class AsaasService {

        public async static Task<bool> CriarCliente(Usuario Usuario) {
            var options = new RestClientOptions(AppSettingsService.UrlApiAsaas + "customers");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("access_token", AppSettingsService.ChaveAsaas);
            request.AddJsonBody(new { name = Usuario.Nome, cpfCnpj = Usuario.Cpf });

            try {
                var response = await client.PostAsync(request);

                var RetornoAsaas = JsonSerializer.Deserialize<AsaasRetornoCliente>(response.Content);
                Usuario.IdAsaas = RetornoAsaas.id;
            } catch {
                return false;
            }

            return true;
        }

        public async static Task<DadosCobranca?> CriarCobrança(CriarCobrancaDados dados) {
            var options = new RestClientOptions(AppSettingsService.UrlApiAsaas + "payments");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("access_token", AppSettingsService.ChaveAsaas);

            DateTime dataVencimentoCobranca = DateTime.Now.AddDays(1);
            DateTime dataVencimentoQRCode = DateTime.Now;

            request.AddJsonBody(new { 
                customer = dados.UsuarioAsaasID,
                billingType = "PIX",
                value = dados.Valor, 
                dueDate = dataVencimentoCobranca.ToString("yyyy-MM-dd") 
            });

            try {
                var response = await client.PostAsync(request);

                var RetornoAsaasCobranca = JsonSerializer.Deserialize<AsaasRetornoCliente>(response.Content);

                var RetornoAsaasPix = await GerarQRCodePix(RetornoAsaasCobranca.id);
                if (RetornoAsaasPix == null) { return null; }

                AnexoService.OpcoesSalvarArquivo opcoesSalvarArquivo = new() {
                    NomeGuid = Guid.NewGuid().ToString(),
                    CaminhoRelativo = AnexoService.CriarCaminhoRelativoDiretorioPix(),
                    ArquivoBase64 = RetornoAsaasPix.encodedImage
                };

                AnexoService.SalvarArquivo(opcoesSalvarArquivo);

                return new DadosCobranca() { 
                    CobrancaAsaasID = RetornoAsaasCobranca.id,
                    CaminhoRelativoImagem = Path.Combine(opcoesSalvarArquivo.CaminhoRelativo, opcoesSalvarArquivo.NomeGuid),
                    CodigoPagamentoPix = RetornoAsaasPix.payload,
                    DataVencimentoCobranca = dataVencimentoCobranca.Date,
                    DataVencimentoPix = dataVencimentoQRCode.Date
                };
            }
            catch {
                return null;
            }
        }

        public async static Task<AsaasRetornoPix?> GerarQRCodePix(string AsaasCobrancaID) {
            var options = new RestClientOptions(AppSettingsService.UrlApiAsaas + "payments/" + AsaasCobrancaID + "/pixQrCode");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("access_token", AppSettingsService.ChaveAsaas);

            try {
                var response = await client.GetAsync(request);

                var RetornoAsaas = JsonSerializer.Deserialize<AsaasRetornoPix>(response.Content);
                return RetornoAsaas;
            }
            catch {
                return null;
            }
        }

        public class CriarCobrancaDados {
            public required string UsuarioAsaasID;
            public required decimal Valor;
        }

        public class DadosCobranca {
            public required string CobrancaAsaasID { get; set; }
            public required string CaminhoRelativoImagem { get; set; }
            public required string CodigoPagamentoPix { get; set; }
            public required DateTime DataVencimentoCobranca { get; set; }
            public required DateTime DataVencimentoPix { get; set; }
        }

        private class AsaasRetornoCliente {
            public string id { get; set; } = null!;
        }

        private class AsaasRetornoCobranca {
            public string id { get; set; } = null!;
        }

        public class AsaasRetornoPix {
            public string encodedImage { get; set; } = null!;
            public string payload { get; set; } = null!;
        }
    }
}
