﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;
using Model.ViewModel.account;
using Model.Modelos;
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
        public IActionResult Transaction([FromBody] Transaction_DTO transactionDTO)
        {
            var result = _repository.Transaction(transactionDTO.from_id, transactionDTO.to_id, transactionDTO.send_balance);

            if (!result.success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }



        [HttpPut("AddBalance")]
        public IActionResult Add_Balance(int Account, int Balance)
        {
            var result = _repository.Add_Balance(Account, Balance);

            if (!result.success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }



        [HttpGet("GetHistory")]
        public ActionResult<History_object_DTO> GetHistory(int Id)
        {
            var history = _repository.Get_history_By_Id(Id);
            if (history == null) return NotFound("Account missing");
            var result = _mapper.Map<IEnumerable<History_object_DTO>>(history);
            return Ok(result);
        }

    }
}
