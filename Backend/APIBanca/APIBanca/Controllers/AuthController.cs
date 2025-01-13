using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicio.IServices;
using Model.ViewModels;

namespace API_TrabajoPractico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("Registro")]
        public ActionResult<string> Registro([FromBody] RegistroViewModel cuenta)
        {
            string response = string.Empty;
            try
            {
                response = _service.Registro(cuenta);
                if (response == "Email is required" || response == "Password is required" || response == "Email is already in use")
                    return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

            return Ok(response);
        }

        [HttpPost("Login")]
        public ActionResult<string> Login([FromBody] LoginViewModel Cuenta)
        {
            string response = string.Empty;
            try
            {
                response = _service.Login(Cuenta);
                if (string.IsNullOrEmpty(response))
                    return NotFound("Incorrect email/password");
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

            return Ok(response);
        }
    }
}
