using Model.ViewModels;
using MySqlX.XDevAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;

namespace Servicio.IServices
{
    public interface ICuentaService
    {
        public Cuenta GetAccountbyEmail(string email);

    }
}