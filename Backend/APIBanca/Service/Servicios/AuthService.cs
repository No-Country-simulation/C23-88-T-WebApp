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
        private readonly IMailService _service;

        public AuthService(BancaDBContext context, IOptions<AppSettings> appSettings, IMailService service)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _service = service;
        }

        public string Registro(RegistroViewModel account)
        {
            // valida email

            if (string.IsNullOrEmpty(cuenta.email))

            if (string.IsNullOrEmpty(account.email))

            {
                return "El email no debe ser vacio";
            }

            // valida password

            if (string.IsNullOrEmpty(cuenta.password))

            if (string.IsNullOrEmpty(account.password))

            {
                return "La password no cumple los requisitos minimos";
            }

            // revisa la disponibilidad del email

            Cuenta? cuentaexiste = _context.Cuenta.FirstOrDefault(x => x.email == cuenta.email);
            if (cuentaexiste != null)

            Account? accountexiste = _context.Account.FirstOrDefault(x => x.email == account.email);
            if (accountexiste != null)

            {
                return "El email ya se encuentra registrado";
            }

            // revisa la disponibilidad del dni
            User? usuarioexiste = _context.User.FirstOrDefault(x => x.dni == account.iden);
            if (usuarioexiste != null)
            {
                return "El DNI ya se encuentra registrado";
            }
            // revisa la disponibilidad del cuit
            Company? empresaexiste = _context.Company.FirstOrDefault(x => x.cuit == account.iden);
            if (usuarioexiste != null)
            {
                return "El cuit ya se encuentra registrado";
            }

            // asigna datos a usuario o empresa
            if (account.role == "usuario" || account.role == "empresa")
            {
                // Create the account
                var nuevaaccount = new Account()
                {

                    email = cuenta.email,
                    password = cuenta.password.GetSHA256(),
                    Rol = cuenta.Rol

                    email = account.email,
                    password = account.password.GetSHA256(),
                    role = account.role,
                    active = 0

                };

                _context.Account.Add(nuevaaccount);
                _context.SaveChanges();

                if (account.role == "usuario")
                {                   

                    var nuevoUsuario = new User()
                    {
                        dni = account.iden,
                        name = account.name,
                        surname = account.surname,
                        phone = account.phone,
                        address = account.address,
                        account_id = nuevaaccount.id,
                    };

                    _context.User.Add(nuevoUsuario);
                    _context.SaveChanges();

                    var nuevoBanco = new Account_Balance()
                    {
                        balance = 0,
                        max_balance = 2000000,
                        account_id = nuevaaccount.id,
                    };

                    _context.Account_Balance.Add(nuevoBanco);
                    _context.SaveChanges();
                    _service.Send_Verification_Email(account.email, account.name, account.surname, nuevaaccount.id);

                    return "Registro completado";
                }
                else if (account.role == "empresa")
                {
                    var nuevaEmpresa = new Company()
                    {
                        cuit = account.iden,
                        phone = account.phone,
                        address = account.address,
                        account_id = nuevaaccount.id,
                    };

                    _context.Company.Add(nuevaEmpresa);
                    _context.SaveChanges();

                    var nuevoBanco = new Account_Balance()
                    {
                        balance = 0,
                        max_balance = 2000000,
                        account_id = nuevaaccount.id,
                    };

                    _context.Account_Balance.Add(nuevoBanco);
                    _context.SaveChanges();

                    _service.Send_Verification_Email(account.email, account.name, account.surname, nuevaaccount.id);

                    return "Registro completado";
                }

                return "Ha ocurrido un error"; // Unlikely to reach here but safe fallback
            }
            else
            {
                return "No se puede crear la account debido a un rol inválido";
            }
        }

        public string Autenticate(int id)
        {
            Cuenta? cuenta = _context.Cuenta.FirstOrDefault(x => x.email == Cuenta.email && x.password == Cuenta.password.GetSHA256());

            if (accountexiste == null)
            {
                return null;
            }

            accountexiste.active = 1;
            _context.SaveChanges();

            return "Cuenta activada con exito";
        }

        public string Login(LoginViewModel account)
        {
            Account? vaccount = _context.Account.FirstOrDefault(x => x.email == account.email && x.password == account.password.GetSHA256());

            if (vaccount == null)
            {
                return string.Empty;
            }

            return GetToken(vaccount);
        }

        private string GetToken(Account account)
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

                        new Claim(ClaimTypes.NameIdentifier, account.id.ToString()),
                        new Claim(ClaimTypes.Email, account.email),
                        new Claim(ClaimTypes.Role, account.role),

                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));




        }
    }
}
