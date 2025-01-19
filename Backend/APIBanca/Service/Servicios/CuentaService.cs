using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;
using Model.ViewModel.account;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Common;
using Servicio.IServices;

namespace Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly BancaDBContext _context;

        public AccountService(BancaDBContext context)
        {
            _context = context;
        }

        public Account GetAccountbyEmail(string email)
        {
            return _context.Account.FirstOrDefault(p => p.email == email);
        }

        public Account GetAccountbyId(int id)
        {
            return _context.Account.FirstOrDefault(p => p.id == id);
        }

        public User GetUserbyId(int id)
        {
            return _context.User.FirstOrDefault(p => p.account_id == id);
        }

        public Company GetEmpresabyId(int id)
        {
            return _context.Company.FirstOrDefault(p => p.account_id == id);
        }


    }

}

