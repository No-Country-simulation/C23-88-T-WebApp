﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Modelos;
using System;
using System.Collections.Generic;

namespace Model.Modelos.Configurations
{
    public partial class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> entity)
        {
            entity.HasKey(e => e.Dni).HasName("PRIMARY");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.IdCuenta, "usuario_a_cuenta_idx");

            entity.Property(e => e.Dni)
                .ValueGeneratedNever()
                .HasColumnName("dni");
            entity.Property(e => e.IdCuenta).HasColumnName("id_cuenta");

            entity.HasOne(d => d.IdCuentaNavigation).WithMany(p => p.Usuario)
                .HasForeignKey(d => d.IdCuenta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("usuario_a_cuenta");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Usuario> entity);
    }
}
