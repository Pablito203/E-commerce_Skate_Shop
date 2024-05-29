using System.Security.Cryptography;
using System.Text;

namespace SkateShopAPI.Services {
    public static class CriptografiaService {

        public static string GerarHash(this string valor) {
            var hash = SHA1.Create();
            var encoding = new ASCIIEncoding();
            var array = encoding.GetBytes(valor);

            array = hash.ComputeHash(array);

            var strHexadecimal = new StringBuilder(array.Length);

            foreach ( var item in array ) {
                strHexadecimal.Append(item.ToString("x2"));
            }

            return strHexadecimal.ToString();
        }
    }
}
