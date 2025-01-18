﻿using Microsoft.AspNetCore.Http;
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
        private readonly IMailService _Mailrepository;
        public AuthController(IAuthService service, IMailService mailService)
        {
            _service = service;
            _Mailrepository = mailService;
        }

        [HttpPost("Registro")]
        public ActionResult<string> Registro([FromBody] RegistroViewModel cuenta)
        {
            try
            {
                string response = _service.Registro(cuenta);

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
                    return BadRequest(response); // Error conocido
                }
                _Mailrepository.Send_Welcome_email(cuenta.email);
                return Ok(response); // Registro exitoso
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
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
