using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.ViewModel
{
    public class ResetPasswordRequest
    {
        public string email { get; set; }
        public string code { get; set; }
        [Required(ErrorMessage = "Debes escribir una contraseña")]
        [StringLength(15, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 16 caracteres")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$", ErrorMessage = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.")]
        public string newpassword { get; set; }
    }
}
