﻿using Microsoft.Extensions.Options;
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
            // valida email
            if (string.IsNullOrEmpty(cuenta.email))
            {
                return "El email no debe ser vacio";
            }

            // valida password
            if (string.IsNullOrEmpty(cuenta.password))
            {
                return "La password no cumple los requisitos minimos";
            }

            // revisa la disponibilidad del email
            Cuenta? cuentaexiste = _context.Cuenta.FirstOrDefault(x => x.email == cuenta.email);
            if (cuentaexiste != null)
            {
                return "El email ya se encuentra registrado";
            }

            // revisa la disponibilidad del dni
            Usuario? usuarioexiste = _context.Usuario.FirstOrDefault(x => x.Dni == cuenta.Iden);
            if (usuarioexiste != null)
            {
                return "El DNI ya se encuentra registrado";
            }
            // revisa la disponibilidad del cuit
            Empresa? empresaexiste = _context.Empresa.FirstOrDefault(x => x.Cuit == cuenta.Iden);
            if (usuarioexiste != null)
            {
                return "El cuit ya se encuentra registrado";
            }

            // asigna datos a usuario o empresa
            if (cuenta.Rol == "usuario" || cuenta.Rol == "empresa")
            {
                // Create the account
                var nuevaCuenta = new Cuenta()
                {
                    email = cuenta.email,
                    password = cuenta.password.GetSHA256(),
                    Rol = cuenta.Rol
                };

                _context.Cuenta.Add(nuevaCuenta);
                _context.SaveChanges();

                if (cuenta.Rol == "usuario")
                {                   

                    var nuevoUsuario = new Usuario()
                    {
                        Dni = cuenta.Iden,
                        Nombre = cuenta.Nombre,
                        Apellido = cuenta.Apellido,
                        Tel = cuenta.Tel,
                        IdCuenta = nuevaCuenta.Id,
                    };

                    _context.Usuario.Add(nuevoUsuario);
                    _context.SaveChanges();

                    return "Registro completado";
                }
                else if (cuenta.Rol == "empresa")
                {
                    var nuevaEmpresa = new Empresa()
                    {
                        Cuit = cuenta.Iden,
                        IdCuenta = nuevaCuenta.Id,
                    };

                    _context.Empresa.Add(nuevaEmpresa);
                    _context.SaveChanges();

                    return "Registro completado";
                }

                return "Ha ocurrido un error"; // Unlikely to reach here but safe fallback
            }
            else
            {
                return "No se puede crear la cuenta debido a un rol inválido";
            }
        }


        public string Login(LoginViewModel Cuenta)
        {
            Cuenta? cuenta = _context.Cuenta.FirstOrDefault(x => x.email == Cuenta.email && x.password == Cuenta.password.GetSHA256());

            if (cuenta == null)
            {
                return string.Empty;
            }

            return GetToken(cuenta);
        }

        private string GetToken(Cuenta cuenta)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, cuenta.Id.ToString()),
                        new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", cuenta.email),
                        new Claim(ClaimTypes.Role, cuenta.Rol),
                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));




        }
    }
}
