﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.ViewModels
{
    public class RegistroViewModel
    {
        [Required(ErrorMessage = "Email es obligatorio")]
        [MinLength(3, ErrorMessage = "El Email debe tener al menos 3 caracteres")]
        [MaxLength(250, ErrorMessage = "Email demasiado largo")]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico es inválido")]

        public string email { get; set; }

        [Required(ErrorMessage = "Debes escribir una contraseña")]
        [StringLength(15, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 16 caracteres")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$", ErrorMessage = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.")]
        public string password { get; set; }

        [Required(ErrorMessage = "El Nombre es obligatorio")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 16 caracteres")]
        public string name { get; set; }

        [Required(ErrorMessage = "El Apellido es obligatorio")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "El apellido debe tener entre 3 y 16 caracteres")]
        public string surname { get; set; }

        [Required(ErrorMessage = "El teléfono es obligatorio")]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "El teléfono debe tener entre 3 y 15 caracteres")]
        [RegularExpression(@"^\+?[0-9\s\-]{3,15}$", ErrorMessage = "El teléfono debe contener solo números, espacios o guiones y puede comenzar con un '+'")]
        public string phone { get; set; }

        [Required(ErrorMessage = "El rol es obligatorio")]
        [RegularExpression(@"^(usuario|empresa)$", ErrorMessage = "role invalido")]
        public string role { get; set; }

        [Required(ErrorMessage = "La direccion es obligatoria")]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "La direccion debe tener entre 3 y 15 caracteres")]
        public string address { get; set; }

        [Required(ErrorMessage = "La identificación es obligatoria")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Identificacion no valida")]
        public string iden { get; set; }
    }
}
