using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.DTO;
using Model.Modelos;

namespace Model.ViewModel.account
{
    public class account_Usuario_DTO
    {
        // Esto esta en account
        public string email { get; set; }

        // El resto en el usuario 
        public string dni { get; set; }

        public int account_id { get; set; }

        public string name { get; set; }

        public string surname { get; set; }

        public string phone { get; set; }
        public string address { get; set; }

    }
}
