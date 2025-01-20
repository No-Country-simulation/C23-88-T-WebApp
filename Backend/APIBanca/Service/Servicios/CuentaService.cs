using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;
using Model.ViewModel.Cuenta;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Common;
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
            return _context.Cuenta.FirstOrDefault(p => p.email == email);
        }

        public Cuenta GetAccountbyId(int id)
        {
            return _context.Cuenta.FirstOrDefault(p => p.Id == id);
        }

        public Usuario GetUserbyId(int id)
        {
            return _context.Usuario.FirstOrDefault(p => p.IdCuenta == id);
        }

        public Empresa GetEmpresabyId(int id)
        {
            return _context.Empresa.FirstOrDefault(p => p.IdCuenta == id);
        }


    }

}

