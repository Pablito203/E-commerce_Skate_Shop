namespace SkateShopAPI.ModelsAPI {
    public class RespostaAPI {
        public object? result { get; set; }
        public string? MensagemErro { get; set; }
        public string? MensagemAviso { get; set; }

        public RespostaAPI(object ObjetoResposta, string? MensagemAviso = null) {
            this.result = ObjetoResposta;
            this.MensagemAviso = MensagemAviso;
        }

        public RespostaAPI(string MensagemErro) {
            this.MensagemErro = MensagemErro;
        }
    }
}
