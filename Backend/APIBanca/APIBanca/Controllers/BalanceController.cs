using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;
using Model.ViewModel.account;
namespace APIBanca.Controllers
{
    [ApiController]
    [Route("Balance")]
    public class BalanceController : Controller
    {
        private readonly IAuthService _Authrepository;
        private readonly IMailService _Mailrepository;
        private readonly IBalanceService _repository;
        private readonly IMapper _mapper;
        public BalanceController(IMapper mapper, IBalanceService repository, IAuthService authrepository)
        {
            _mapper = mapper;
            _Authrepository = authrepository;
            _repository = repository;
        }
        //[Authorize]
        [HttpGet("GetBalancebyAccountId")]
        public ActionResult<Balance_Get_DTO> GetBalanceByAccountId(int Id)
        {
            var balance = _repository.GetBalancebyAccountId(Id);
            if (balance == null) return NotFound("Account missing");
            var result = _mapper.Map<Balance_Get_DTO>(balance);
            return Ok(result);
        }

        [HttpPut("Transaction")]
        public ActionResult<Transaction_DTO> Transaction([FromBody] Transaction_DTO transactionDTO)
        {

            // Call the repository method to process the transaction
            var result = _repository.Transaction(transactionDTO.from_id, transactionDTO.to_id, transactionDTO.send_balance);

            // Return the result of the transaction
            return Ok(result);
        }

        [HttpPut("AddBalance")]
        public ActionResult<Transaction_DTO> Add_Balance(int Account, int Balance)
        {

            // Call the repository method to process the transaction
            var result = _repository.Add_Balance(Account, Balance);

            // Return the result of the transaction
            return Ok(result);
        }

    }
}
