namespace SkateShopAPI.Services {
    public class AnexoService {

        public static void SalvarArquivo(OpcoesSalvarArquivo opcoes) {
            string Diretorio = GetCaminhoAbsoluto(opcoes.CaminhoRelativo);

            if (!Directory.Exists(Diretorio)) {
                Directory.CreateDirectory(Diretorio);
            }

            string NomeArquivo = opcoes.NomeGuid + ".jpg";
            string CaminhoArquivo = Path.Combine(Diretorio, NomeArquivo);

            FileStream fs = System.IO.File.Create(CaminhoArquivo);
            fs.Position = 0;
            fs.Seek(0, SeekOrigin.Begin);
            if (opcoes.ArquivoBase64 != null) {
                byte[] dataBuffer = Convert.FromBase64String(opcoes.ArquivoBase64);
                fs.Write(dataBuffer, 0, dataBuffer.Length);
            } else {
                opcoes.Arquivo.CopyTo(fs);
            }

            fs.Close();
        }

        public static string CriarCaminhoRelativoDiretorioProduto(int ProdutoID) {
            string CaminhoRelativo = Path.Combine("Imagens", "Produtos");
            CaminhoRelativo = Path.Combine(CaminhoRelativo, ProdutoID.ToString());
            return CaminhoRelativo;
        }
        
        public static string CriarCaminhoRelativoDiretorioPix() {
            string CaminhoRelativo = Path.Combine("Imagens", "Pix");
            return CaminhoRelativo;
        }

        public static string GetCaminhoAbsoluto(string CaminhoRelativo) {
            string CaminhoAbsoluto = Path.Combine(Environment.CurrentDirectory, CaminhoRelativo);
            return CaminhoAbsoluto;
        }

        public static string BuscarArquivoBase64(string CaminhoRelativo) {
            string CaminhoAbsoluto = Path.Combine(Environment.CurrentDirectory, CaminhoRelativo);

            Byte[] bytes = System.IO.File.ReadAllBytes(CaminhoAbsoluto);
            String file = Convert.ToBase64String(bytes);

            return file;
        }

        public class OpcoesSalvarArquivo {
            public required string NomeGuid { get; set; }
            public required string CaminhoRelativo { get; set; }
            public IFormFile? Arquivo { get; set; }
            public string? ArquivoBase64 { get; set; }
        }
    }
}
