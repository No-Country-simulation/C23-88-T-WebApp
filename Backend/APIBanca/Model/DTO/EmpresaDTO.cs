using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.DTO
{
    public class EmpresaDTO
    {
        public string cuit { get; set; }
        public long id_account { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
    }
}
