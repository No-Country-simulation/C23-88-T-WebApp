using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;
using MySqlX.XDevAPI;
using Servicio.IServices;

namespace Service.Services
{
    public class CuentaService : ICuentaService
    {
        private readonly BancaDBContext _context;

        public CuentaService(BancaDBContext context)
        {
            _context = context;
        }

        public Cuenta GetAccountbyEmail(string email)
        {
            return _context.Cuenta.FirstOrDefault(p => p.Email == email);
        }
    }
}
