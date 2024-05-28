using Microsoft.AspNetCore.Mvc;
using SkateShopAPI.EntityModels;
using System.Text.Json.Serialization;

namespace SkateShopAPI.Controllers {

    [ApiController]
    [Route("webhook")]
    public class WebhookController {

        [HttpPost("Pagamento")]
        public void PostPagamento(PagamentoEvento pagamento) {
            if (pagamento.Evento != "PAYMENT_RECEIVED") {
                return;
            }

            Repository repository = new Repository();

            Pedido pedido = repository.FilterQuery<Pedido>((p) => p.IdAsaas == pagamento.payment.id).First();

            pedido.PagamentoRealizado = true;

            repository.Update(pedido);

            repository.Dispose();
        }

    }
    public class PagamentoEvento {
        public string id { get; set; } = null!;
        [JsonPropertyName("event")]
        public string Evento { get; set; } = null!;
        public required Payment payment { get; set; }
    }

    public class Payment {
        public string id { get; set; } = null!;
    }
}
