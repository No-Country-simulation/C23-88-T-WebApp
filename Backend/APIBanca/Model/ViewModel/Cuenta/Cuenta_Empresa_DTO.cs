using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.DTO;
using Model.Modelos;

namespace Model.ViewModel.Cuenta
{
    public class Cuenta_Empresa_DTO
    {
        // Esto esta en cuenta
        public string email { get; set; }

        // El resto en empresa
        public string Cuit { get; set; }

        public int IdCuenta { get; set; }

    }
}
