﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Model.Modelos;

public partial class Cuenta
{
    public int Id { get; set; }

    public string password { get; set; }

    public string email { get; set; }

    public string Rol { get; set; }

    public virtual ICollection<Empresa> Empresa { get; set; } = new List<Empresa>();

    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}