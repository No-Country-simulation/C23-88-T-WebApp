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
    public interface IAccountService
    {
        public Account GetAccountbyEmail(string email);

        public Account GetAccountbyId(long id);

        public User GetUserbyId(long id);
        public Company GetEmpresabyId(long id);

    }
}