using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using Model.DTO;
using Model.Modelos;
using Model.ViewModel;
using Model.ViewModels;
using Modelo.Helper;
using Newtonsoft.Json;
using Service.Helper;
using Servicio.IServices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
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
            if (string.IsNullOrEmpty(account.email))
            {
                return "El email no debe ser vacio";
            }

            // valida password
            if (string.IsNullOrEmpty(account.password))
            {
                return "La contraseña no cumple los requisitos minimos";
            }

            // revisa la disponibilidad del email
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
                    id =  Generate_id(),
                    email = account.email,
                    password = account.password.GetSHA256(),
                    role = account.role,
                    ver_code = new Random().Next(100000, 999999).ToString(),
                    active = 0
                };;

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
                    _service.Send_Verification_Email(account.email, account.name, account.surname, nuevaaccount.ver_code);

                    return "Registro completado";
                }
                else if (account.role == "empresa")
                {
                    var nuevaEmpresa = new Company()
                    {
                        cuit = account.iden,
                        phone = account.phone,
                        name = account.name,
                        surname = account.surname,
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

                    //Hash_ID(account.email); Not working

                    _service.Send_Verification_Email(account.email, account.name, account.surname, nuevaaccount.ver_code);

                    return "Registro completado";
                }

                return "Ha ocurrido un error"; // Unlikely to reach here but safe fallback
            }
            else
            {
                return "No se puede crear la account debido a un rol inválido";
            }
        }

        public string Authenticate(AuthenticationViewModel userRequest)
        {
            // Buscar la cuenta que coincida con el email y el código
            var account = _context.Account.FirstOrDefault(a => a.email == userRequest.email && a.ver_code == userRequest.ver_code);

            // Verificar si no se encontró ninguna cuenta
            if (account == null)
            {
                return "Email o código de verificación incorrecto.";
            }

            // Verificar si ya está activada
            if (account.active == 1)
            {
                return "La cuenta ya está activada.";
            }

            // Activar la cuenta
            account.active = 1;
            _context.SaveChanges();

            return "Cuenta activada con éxito.";
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

        public async Task<ResponseModel> InitiatePasswordResetAsync(string email)
        {
            // Verificar si el email existe
            var account = await _context.Account.FirstOrDefaultAsync(a => a.email == email);
            if (account == null)
            {
                return new ResponseModel { success = false, message = "El email no está registrado." };
            }

            // Generar un código de verificación aleatorio
            var verificationCode = new Random().Next(100000, 999999).ToString();

            // Guardar el código en la base de datos (sobreescribiendo `ver_code`)
            account.ver_code = verificationCode;
            await _context.SaveChangesAsync();


            await _service.Send_Reset_Pass_Email(email, verificationCode);

            return new ResponseModel
            {
                success = true,
                message = "Código de verificación enviado al email.",
            }; 
        }

        public async Task<ResponseModel> ResetPasswordAsync(string email, string code, string newPassword)
        {
            // Buscar la cuenta que coincida con el email y el código
            var account = await _context.Account.FirstOrDefaultAsync(a => a.email == email && a.ver_code == code);
            if (account == null)
            {
                return new ResponseModel { success = false, message = "Email o código de verificación incorrecto." };
            }

            // Actualizar la contraseña y limpiar el código de verificación
            account.password = newPassword.GetSHA256(); // Usa un método de hash seguro
            account.ver_code = null; // Limpiar el código después de usarlo

            await _context.SaveChangesAsync();

            return new ResponseModel
            {
                success = true,
                message = "Contraseña actualizada con éxito.",
            };

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
                        new Claim(ClaimTypes.NameIdentifier, account.id.ToString()),
                        new Claim(ClaimTypes.Email, account.email),
                        new Claim(ClaimTypes.Role, account.role),
                    }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));




        }

        public async Task<string> CheckLocation(string ipAddress)
        {
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetStringAsync($"http://ip-api.com/json/{ipAddress}");
                var locationInfo = JsonConvert.DeserializeObject<LocationResponse>(response);

                return $"{locationInfo.City}, {locationInfo.Country}";
            }
        }

        public class LocationResponse
        {
            public string City { get; set; }
            public string Country { get; set; }
        }

        private int Generate_id()
        {
            Random rand = new Random();
            int randomInt;
            Account? accountexiste;

            do
            {
                // Generate a new random integer
                randomInt = rand.Next(1000000000, 2147483647);

                // Check if an account with that ID already exists
                accountexiste = _context.Account.FirstOrDefault(x => x.id == randomInt);

            } while (accountexiste != null); // Continue generating until the ID is unique

            return randomInt; // Return the unique ID
        }


    }


}
