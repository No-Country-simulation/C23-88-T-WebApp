using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;

namespace APIBanca.Controllers
{
    [ApiController]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly ICuentaService _repository;
        private readonly IAuthService _Authrepository;
        private readonly IMapper _mapper;
        public AccountController(ICuentaService repository, IMapper mapper, IAuthService authrepository)
        {
            _repository = repository;
            _mapper = mapper;
            _Authrepository = authrepository;
        }

        [HttpGet("GetById")]
        public ActionResult<CuentaDTO> GetClientById(string email)
        {
            var acc = _repository.GetAccountbyEmail(email);
            if (acc == null) return NotFound();
            return Ok(_mapper.Map<CuentaDTO>(acc));
        }
    }
}
