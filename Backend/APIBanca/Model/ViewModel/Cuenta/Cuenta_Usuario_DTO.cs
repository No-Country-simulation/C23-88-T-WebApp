using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.DTO;
using Model.Modelos;

namespace Model.ViewModel.Cuenta
{
    public class Cuenta_Usuario_DTO
    {
        // Esto esta en cuenta
        public string email { get; set; }

        // El resto en el usuario 
        public string Dni { get; set; }

        public int IdCuenta { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string Tel { get; set; }

    }
}
