using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;
using Model.ViewModel.account;
namespace APIBanca.Controllers
{
    [ApiController]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly IAccountService _repository;
        private readonly IAuthService _Authrepository;
        private readonly IMailService _Mailrepository;
        private readonly IMapper _mapper;
        public AccountController(IAccountService repository, IMapper mapper, IAuthService authrepository, IMailService mailService)
        {
            _repository = repository;
            _mapper = mapper;
            _Authrepository = authrepository;
            _Mailrepository = mailService;
        }
        //[Authorize]
        [HttpGet("GetByEmail")]
        public ActionResult<account_Usuario_DTO> GetClientById(string email)
        {
            var acc = _repository.GetAccountbyEmail(email);
            if (acc == null) return NotFound("Account missing");

            if (acc.role == "usuario")
            {
                var info = _repository.GetUserbyId(acc.id);
                if (info == null) return NotFound();
                // Map both account and Usuario to User_Account_DTO
                var result = _mapper.Map<account_Usuario_DTO>(acc);
                _mapper.Map(info, result); // This will map the User data to the result DTO
                _Mailrepository.Send_Email_Test(email, "Test has gone well : )");
                return Ok(result);
            }
            else if (acc.role == "empresa")
            {
                var info = _repository.GetEmpresabyId(acc.id);
                if (info == null) return NotFound("Info missing");
                // Map both account and Usuario to User_Account_DTO
                var result = _mapper.Map<account_Empresa_DTO>(acc);
                _mapper.Map(info, result); // This will map the User data to the result DTO
                _Mailrepository.Send_Email_Test(email, "Test has gone well : )");
                return Ok(result);

            }
            return Ok(acc.role);
        }
    }
}
