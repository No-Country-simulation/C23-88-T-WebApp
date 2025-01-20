using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.DTO
{
    public class CuentaDTO
    {
        public int id { get; set; }
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }
}
