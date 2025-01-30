﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTO;
using Servicio.IServices;
using Model.ViewModel.account;
using Model.Modelos;
using Newtonsoft.Json;
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
        public ActionResult<Balance_Get_DTO> GetBalanceByAccountId(long Id)
        {
            var balance = _repository.GetBalancebyAccountId(Id);
            if (balance == null) return NotFound("Account missing");
            var result = _mapper.Map<Balance_Get_DTO>(balance);
            string json = JsonConvert.SerializeObject(result);
            return Ok(json);
        }

        [HttpPut("Transaction")]
        public IActionResult Transaction([FromBody] Transaction_DTO transactionDTO)
        {
            var result = _repository.Transaction(transactionDTO.from_id, transactionDTO.to_id, transactionDTO.send_balance);

            if (!result.success)
            {
                return BadRequest(result);
            }

            string json = JsonConvert.SerializeObject(result);
            return Ok(json);
        }



        [HttpPut("AddBalance")]
        public IActionResult Add_Balance([FromBody] Recharge_DTO transactionDTO)
        {
            var result = _repository.Add_Balance(transactionDTO);

            if (!result.success)
            {
                return BadRequest(result);
            }
            string json = JsonConvert.SerializeObject(result);
            return Ok(json);
        }



        [HttpGet("GetHistory")]
        public ActionResult<IEnumerable<History_object_DTO>> GetHistory(long Id, int limit = 10, int offset = 0)
        {
            var totalRecords = _repository.CountHistoryById(Id); // Nuevo método para contar los registros totales
            var history = _repository.Get_history_By_Id(Id, limit, offset);

            if (history == null || !history.Any())
                return NotFound("Not Found");

            var result = _mapper.Map<IEnumerable<History_object_DTO>>(history);

            Response.Headers.Add("X-Total-Count", totalRecords.ToString()); // Agregar total de registros en el header

            string json = JsonConvert.SerializeObject(result);
            return Ok(json);
        }

        [HttpGet("GetById")]
        public IActionResult GetById(long id)
        {
            var result = _repository.GetUserOrCompanyById(id);
            if (result == null)
                return NotFound("User or Company not found");

            string json = JsonConvert.SerializeObject(result);
            return Ok(json);
        }


    }
}
