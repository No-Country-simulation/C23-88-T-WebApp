using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicio.IServices;
using Model.ViewModels;
using Model.Modelos;
using Model.ViewModel;

namespace API_TrabajoPractico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly IMailService _Mailrepository;

        public AuthController(IAuthService service, IMailService mailService)
        {
            _service = service;
            _Mailrepository = mailService;
        }

        [HttpPost("Registro")]
        public ActionResult Registro([FromBody] RegistroViewModel account)
        {
            try
            {
                string response = _service.Registro(account);

                // Lista de errores conocidos
                var erroresConocidos = new List<string>
                {
                    "El email no debe ser vacio",
                    "La contraseña no cumple los requisitos minimos",
                    "El email ya se encuentra registrado",
                    "El DNI ya se encuentra registrado",
                    "El cuit ya se encuentra registrado"
                };

                if (erroresConocidos.Contains(response))
                {
                    // Devuelve un error conocido en formato JSON
                    return BadRequest(new { error = response });
                }

                _Mailrepository.Send_Welcome_Email(account.email);

                // Respuesta de registro exitoso
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                // Error interno del servidor
                return StatusCode(500, new { error = $"Error interno del servidor: {ex.Message}" });
            }
        }

        [HttpPut("Authenticate")]
        public ActionResult Autenticate_Account([FromBody] AuthenticationViewModel userRequest)
        {
            try
            {
                string response = _service.Authenticate(userRequest);

                if (string.IsNullOrEmpty(response))
                {
                    // Usuario no encontrado
                    return NotFound(new { message = "No se encontró el usuario" });
                }

                // Usuario autenticado con éxito
                return Ok(new { token = response });
            }
            catch (Exception ex)
            {
                // Error de autenticación
                return BadRequest(new { error = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("Login")]
        public ActionResult Login([FromBody] LoginViewModel account)
        {
            try
            {
                string token = _service.Login(account);

                if (string.IsNullOrEmpty(token))
                {
                    // Login fallido
                    return NotFound(new { message = "Incorrect email/password" });
                }

                // Login exitoso
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                // Error interno
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
