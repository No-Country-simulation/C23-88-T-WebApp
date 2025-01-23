﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore;
using Model.Modelos.Configurations;
using System;
using System.Collections.Generic;
#nullable disable

namespace Model.Modelos;

public partial class BancaDBContext : DbContext
{
    public BancaDBContext(DbContextOptions<BancaDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Account { get; set; }

    public virtual DbSet<Account_Balance> Account_Balance { get; set; }

    public virtual DbSet<Company> Company { get; set; }

    public virtual DbSet<History_object> History_object { get; set; }

    public virtual DbSet<User> User { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_general_ci")
            .HasCharSet("utf8");

        modelBuilder.ApplyConfiguration(new Configurations.AccountConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.Account_BalanceConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.CompanyConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.History_objectConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.UserConfiguration());
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
