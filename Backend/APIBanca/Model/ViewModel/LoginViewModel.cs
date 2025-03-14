﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "email es obligatorio")]
        [MinLength(3, ErrorMessage = "El email debe tener al menos 3 caracteres")]
        [MaxLength(250, ErrorMessage = "email demasiado largo")]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico es inválido")]
        public string email { get; set; }
        [Required(ErrorMessage = "Debes escribir una contraseña")]
        [StringLength(15, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 16 caracteres")]
        public string password { get; set; }
    }
}