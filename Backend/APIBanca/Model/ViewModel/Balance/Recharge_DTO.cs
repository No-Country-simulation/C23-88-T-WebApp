using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.DTO;
using Model.Modelos;

namespace Model.ViewModel.account
{
    public class Recharge_DTO
    {
        [Required(ErrorMessage = "El saldo es obligatorio.")]
        [Range(1, int.MaxValue, ErrorMessage = "El saldo debe ser un numero positivo")]
        public int Value { get; set; }

        [Required(ErrorMessage = "El ID de origen es obligatorio.")]
        [Range(1, int.MaxValue, ErrorMessage = "El ID de origen debe ser un número positivo.")]
        public int Account_id { get; set; }


    }   
}
