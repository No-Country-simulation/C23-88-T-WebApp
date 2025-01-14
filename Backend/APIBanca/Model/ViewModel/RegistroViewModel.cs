using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.ViewModels
{
    public class RegistroViewModel
    {
        public string Email { get; set; }
        public string Contraseña { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Tel { get; set; }
        public string Rol { get; set; }
        public int Iden { get; set; }
    }
}
