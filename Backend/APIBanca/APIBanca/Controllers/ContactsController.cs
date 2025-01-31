using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using Newtonsoft.Json;
using Service.IService;
using Service.Servicios;

namespace APIBanca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost("AddContact")]
        public IActionResult AddContact([FromQuery] int currentUserId, string identifier )
        {
            // Obtener el usuario actual (supongamos que viene del token JWT)           

            var response = _contactService.AddContact(currentUserId, identifier);

            if (response.success)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }

        [HttpGet("GetContactList")]
        public IActionResult GetContactList(int id)
        {
            // Obtener el usuario actual (supongamos que viene del token JWT)
            

            var response = _contactService.GetContactList(id);
            return Ok(response);

        }

        private int GetCurrentUserId()
        {
            // Aquí obtendrías el ID del usuario actual, por ejemplo, desde un token JWT
            return int.Parse(User.Claims.First(c => c.Type == "id").Value);
        }
    }
}
