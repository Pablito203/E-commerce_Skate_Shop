namespace SkateShopAPI.ModelsAPI {
    public class RespostaAPI {
        public object? result { get; set; }
        public string? MensagemErro;
        public string? MensagemAviso;

        public RespostaAPI(object ObjetoResposta, string? MensagemAviso = null) {
            this.result = ObjetoResposta;
            this.MensagemAviso = MensagemAviso;
        }

        public RespostaAPI(string MensagemErro) {
            this.MensagemErro = MensagemErro;
        }
    }
}
