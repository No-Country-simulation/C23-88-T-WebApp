﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Model.Modelos;

public partial class history_object
{
    public int history_obj_id { get; set; }

    public int account_history_id { get; set; }

    public string type { get; set; }

    public int value { get; set; }

    public virtual Account_history account_history { get; set; }
}