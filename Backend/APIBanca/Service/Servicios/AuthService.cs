using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Model.Modelos;
using Model.ViewModels;
using Modelo.Helper;
using Service.Helper;
using Servicio.IServices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly BancaDBContext _context;
        private readonly AppSettings _appSettings;

        public AuthService(BancaDBContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public string Registro(RegistroViewModel cuenta)
        {
            if (string.IsNullOrEmpty(cuenta.Email))
            {
                return "Email is required";
            }

            if (string.IsNullOrEmpty(cuenta.Contraseña))
            {
                return "Password is required";
            }

            //Cuenta? cuentaexiste = _context.Cuenta.FirstOrDefault(x => x.Email == cuenta.Email);

            //if (cuenta != null)
            //{
            //    return "Email is already in use";
            //}

            var nuevaCuenta = new Cuenta()
            {
                Email = cuenta.Email,
                Contraseña = cuenta.Contraseña.GetSHA256()
            };

            _context.Cuenta.Add(nuevaCuenta);
            _context.SaveChanges();

            // Crea el usuario asociado con la cuenta
            var nuevoUsuario = new Usuario()
            {
                Dni = cuenta.DNI,
                IdCuenta = nuevaCuenta.Id,
            };

            _context.Usuario.Add(nuevoUsuario);
            _context.SaveChanges();

            string response = GetToken(_context.Cuenta.OrderBy(x => x.Id).Last());

            return response;
        }

        private string GetToken(Cuenta user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));




        }
    }
}
