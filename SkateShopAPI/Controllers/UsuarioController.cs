using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateShopAPI.EntityModels;

namespace SkateShopAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase {
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            Repository Repository = new Repository();
            var iq = Repository.FilterQuery<Usuario>(u => true);
            var lista = iq.ToList();
            return lista;
        }
    }
}
