﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Modelos;
using System;
using System.Collections.Generic;

namespace Model.Modelos.Configurations
{
    public partial class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> entity)
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.active).HasDefaultValueSql("'1'");
            entity.Property(e => e.email)
                .IsRequired()
                .HasMaxLength(45);
            entity.Property(e => e.password)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.role)
                .IsRequired()
                .HasMaxLength(45);
            entity.Property(e => e.stored_ip)
                .IsRequired()
                .HasMaxLength(45);
            entity.Property(e => e.ver_code).HasMaxLength(45);

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Account> entity);
    }
}
