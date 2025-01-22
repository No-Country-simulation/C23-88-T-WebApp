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
    public interface IBalanceService
    {
        public Account_Balance GetBalancebyAccountId(int Id);

        public String Transaction(int Id_from, int Id_to, int Amount);

        public String Add_Balance(int Id_account, int Amount);

    }
}