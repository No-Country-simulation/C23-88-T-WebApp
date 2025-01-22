using Model.ViewModel;
using Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servicio.IServices
{
    public interface IAuthService
    {
        string Registro(RegistroViewModel User);
        string Login(LoginViewModel User);
        string Authenticate(AuthenticationViewModel userRequest);
        Task<string> ResetPasswordAsync(string email, string code, string newPassword);
        Task<string> InitiatePasswordResetAsync(string email);


    }
}