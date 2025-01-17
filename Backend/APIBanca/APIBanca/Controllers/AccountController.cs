using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;
using Model.ViewModel.Cuenta;
namespace APIBanca.Controllers
{
    [ApiController]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly ICuentaService _repository;
        private readonly IAuthService _Authrepository;
        private readonly IMailService _Mailrepository;
        private readonly IMapper _mapper;
        public AccountController(ICuentaService repository, IMapper mapper, IAuthService authrepository, IMailService mailService)
        {
            _repository = repository;
            _mapper = mapper;
            _Authrepository = authrepository;
            _Mailrepository = mailService;
        }
        //[Authorize]
        [HttpGet("GetByEmail")]
        public ActionResult<Cuenta_Usuario_DTO> GetClientById(string email)
        {
            var acc = _repository.GetAccountbyEmail(email);
            if (acc == null) return NotFound("Account missing");

            if (acc.Rol == "usuario")
            {
                var info = _repository.GetUserbyId(acc.Id);
                if (info == null) return NotFound();
                // Map both Cuenta and Usuario to User_Account_DTO
                var result = _mapper.Map<Cuenta_Usuario_DTO>(acc);
                _mapper.Map(info, result); // This will map the User data to the result DTO
                _Mailrepository.Send_Email_Test(email, "Test has gone well : )");
                return Ok(result);
            }
            else if (acc.Rol == "empresa")
            {
                var info = _repository.GetEmpresabyId(acc.Id);
                if (info == null) return NotFound("Info missing");
                // Map both Cuenta and Usuario to User_Account_DTO
                var result = _mapper.Map<Cuenta_Empresa_DTO>(acc);
                _mapper.Map(info, result); // This will map the User data to the result DTO
                _Mailrepository.Send_Email_Test(email, "Test has gone well : )");
                return Ok(result);

            }
            return Ok(acc.Rol);
        }
    }
}
