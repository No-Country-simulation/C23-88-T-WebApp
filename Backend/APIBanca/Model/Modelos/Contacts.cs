﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Model.Modelos;

public partial class Contacts
{
    public int Id { get; set; }

    public long UserId { get; set; }

    public long ContactAccountId { get; set; }

    public virtual Account ContactAccount { get; set; }

    public virtual Account User { get; set; }
}