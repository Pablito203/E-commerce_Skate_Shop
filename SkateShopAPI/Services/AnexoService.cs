using Microsoft.SqlServer.Server;
using SkateShopAPI.EntityModels;
using System.Runtime.CompilerServices;

namespace SkateShopAPI.Services {
    public class AnexoService {

        public static void SalvarArquivo(OpcoesSalvarArquivo opcoes) {
            string Diretorio = GetCaminhoAbsoluto(opcoes.CaminhoRelativo);

            if (!Directory.Exists(Diretorio)) {
                Directory.CreateDirectory(Diretorio);
            }

            string CaminhoArquivo = Path.Combine(Diretorio, opcoes.Arquivo.Name);

            FileStream fs = System.IO.File.Create(CaminhoArquivo);
            fs.Position = 0;
            fs.Seek(0, SeekOrigin.Begin);
            opcoes.Arquivo.CopyTo(fs);
            fs.Close();
        }

        public static string CriarCaminhoRelativoDiretorioProduto(int ProdutoID) {
            string CaminhoRelativo = Path.Combine("Imagens", "Produtos");
            CaminhoRelativo = Path.Combine(CaminhoRelativo, ProdutoID.ToString());
            return CaminhoRelativo;
        }

        public static string GetCaminhoAbsoluto(string CaminhoRelativo) {
            string CaminhoAbsoluto = Path.Combine(Environment.CurrentDirectory, CaminhoRelativo);
            return CaminhoAbsoluto;
        }
    }

    public class OpcoesSalvarArquivo {
        public required string NomeGuid { get; set; }
        public required string CaminhoRelativo { get; set; }
        public required IFormFile Arquivo { get; set; }
    }
}
