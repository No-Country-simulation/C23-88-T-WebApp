using Model.DTO;
using Model.ViewModel;
using Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Servicio.IServices
{
    public interface IAuthService
    {
        string Registro(RegistroViewModel User, IPAddress remoteIpAddress);
        string Login(LoginViewModel User, IPAddress remoteIpAddress);
        string Authenticate(AuthenticationViewModel userRequest);
        Task<ResponseModel> ResetPasswordAsync(string email, string code, string newPassword);
        Task<ResponseModel> InitiatePasswordResetAsync(string email);
    }
}