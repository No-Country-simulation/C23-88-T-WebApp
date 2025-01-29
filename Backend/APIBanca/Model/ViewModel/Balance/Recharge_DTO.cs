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
        [Required(ErrorMessage = "Balance is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Balance must be a positive number.")]
        public int Value { get; set; }

        [Required(ErrorMessage = "ID is required")]
        [Range(1, long.MaxValue, ErrorMessage = "ID must be a positive number.")]
        public long Account_id { get; set; }


    }   
}
