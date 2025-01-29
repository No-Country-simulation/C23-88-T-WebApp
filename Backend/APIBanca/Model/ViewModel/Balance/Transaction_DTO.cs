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
    public class Transaction_DTO
    {
        [Required(ErrorMessage = "Balance is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Balance must be a positive number.")]
        public int send_balance { get; set; }

        [Required(ErrorMessage = "From ID is required.")]
        [Range(1, long.MaxValue, ErrorMessage = "From ID must be a positive number.")]
        public long from_id { get; set; }

        [Required(ErrorMessage = "To ID is required.")]
        [Range(1, long.MaxValue, ErrorMessage = "To ID must be a positive number.")]
        public long to_id { get; set; }

    }   
}
