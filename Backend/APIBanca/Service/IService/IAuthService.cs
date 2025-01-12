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
        
    }
}