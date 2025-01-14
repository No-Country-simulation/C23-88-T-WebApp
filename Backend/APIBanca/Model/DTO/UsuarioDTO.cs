using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.DTO
{
    public class UsuarioDTO
    {
        public int dni { get; set; }
        public int id_cuenta { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Tel { get; set; }
    }
}
