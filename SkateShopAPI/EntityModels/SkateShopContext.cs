using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SkateShopAPI.EntityModels;

public partial class SkateShopContext : DbContext
{
    public SkateShopContext()
    {
    }

    public SkateShopContext(DbContextOptions<SkateShopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Anexo> Anexos { get; set; }

    public virtual DbSet<Endereco> Enderecos { get; set; }

    public virtual DbSet<Favorito> Favoritos { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<PedidoProduto> PedidoProdutos { get; set; }

    public virtual DbSet<Produto> Produtos { get; set; }

    public virtual DbSet<Tamanho> Tamanhos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=PABLO\\SQLEXPRESS;Initial Catalog=skate_shop;Integrated Security=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Latin1_General_100_CI_AI_SC_UTF8");

        modelBuilder.Entity<Anexo>(entity =>
        {
            entity.HasKey(e => e.Anexo1).HasName("PK__anexo__BE9E739E5DA444A0");

            entity.ToTable("anexo");

            entity.Property(e => e.Anexo1).HasColumnName("anexo");
            entity.Property(e => e.CaminhoRelativo)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("caminho_relativo");
            entity.Property(e => e.Nome)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Produto).HasColumnName("produto");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.Anexos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_anexo_produto");
        });

        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.HasKey(e => e.Endereco1).HasName("PK__endereco__9456D40738E13ED1");

            entity.ToTable("endereco");

            entity.Property(e => e.Endereco1).HasColumnName("endereco");
            entity.Property(e => e.Bairro)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("bairro");
            entity.Property(e => e.Cidade)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("cidade");
            entity.Property(e => e.Complemento)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("complemento");
            entity.Property(e => e.Numero)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("numero");
            entity.Property(e => e.Rua)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("rua");
            entity.Property(e => e.Uf)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("uf");
            entity.Property(e => e.Usuario).HasColumnName("usuario");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_endereco_usuario");
        });

        modelBuilder.Entity<Favorito>(entity =>
        {
            entity.HasKey(e => e.Favorito1).HasName("PK__favorito__F88B004DC232871C");

            entity.ToTable("favorito");

            entity.Property(e => e.Favorito1).HasColumnName("favorito");
            entity.Property(e => e.Produto).HasColumnName("produto");
            entity.Property(e => e.Usuario).HasColumnName("usuario");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_favorito_produto");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_favorito_usuario");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Pedido1).HasName("PK__pedido__D213FC3656F88796");

            entity.ToTable("pedido");

            entity.Property(e => e.Pedido1).HasColumnName("pedido");
            entity.Property(e => e.CaminhoRelativoImagemPix)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("caminho_relativo_imagem_pix");
            entity.Property(e => e.CodigoPagamentoPix)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("codigo_pagamento_pix");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.DataVencimento)
                .HasColumnType("datetime")
                .HasColumnName("data_vencimento");
            entity.Property(e => e.Endereco).HasColumnName("endereco");
            entity.Property(e => e.IdAsaas)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_asaas");
            entity.Property(e => e.PagamentoRealizado).HasColumnName("pagamento_realizado");
            entity.Property(e => e.Usuario).HasColumnName("usuario");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");

            entity.HasOne(d => d.EnderecoNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Endereco)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pedido_endereco");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pedido_usuario");
        });

        modelBuilder.Entity<PedidoProduto>(entity =>
        {
            entity.HasKey(e => e.PedidoProduto1).HasName("PK__pedido_p__67031675CF99C80A");

            entity.ToTable("pedido_produto");

            entity.Property(e => e.PedidoProduto1).HasColumnName("pedido_produto");
            entity.Property(e => e.Pedido).HasColumnName("pedido");
            entity.Property(e => e.Produto).HasColumnName("produto");
            entity.Property(e => e.Tamanho).HasColumnName("tamanho");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");

            entity.HasOne(d => d.PedidoNavigation).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.Pedido)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pedidoProduto_pedido");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pedidoProduto_produto");

            entity.HasOne(d => d.TamanhoNavigation).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.Tamanho)
                .HasConstraintName("FK_pedidoProduto_tamanho");
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Produto1).HasName("PK__produto__582A8D39831DD6AE");

            entity.ToTable("produto");

            entity.Property(e => e.Produto1).HasColumnName("produto");
            entity.Property(e => e.Ativo)
                .IsRequired()
                .HasDefaultValueSql("((1))")
                .HasColumnName("ativo");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.Destaque).HasColumnName("destaque");
            entity.Property(e => e.Nome)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.QuantidadeEstoque).HasColumnName("quantidade_estoque");
            entity.Property(e => e.TamanhoUnico)
                .IsRequired()
                .HasDefaultValueSql("((1))")
                .HasColumnName("tamanho_unico");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");
        });

        modelBuilder.Entity<Tamanho>(entity =>
        {
            entity.HasKey(e => e.Tamanho1).HasName("PK__tamanho__08D913FE369B47A6");

            entity.ToTable("tamanho");

            entity.Property(e => e.Tamanho1).HasColumnName("tamanho");
            entity.Property(e => e.Nome)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Produto).HasColumnName("produto");
            entity.Property(e => e.Quantidade).HasColumnName("quantidade");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.Tamanhos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tamanho_produto");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Usuario1).HasName("PK__usuario__9AFF8FC7D0FBF0EE");

            entity.ToTable("usuario");

            entity.Property(e => e.Usuario1).HasColumnName("usuario");
            entity.Property(e => e.Administrador).HasColumnName("administrador");
            entity.Property(e => e.CpfCnpj)
                .HasMaxLength(18)
                .IsUnicode(false)
                .HasColumnName("cpf_cnpj");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdAsaas)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_asaas");
            entity.Property(e => e.Nome)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Latin1_General_100_CS_AI_SC_UTF8")
                .HasColumnName("senha");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
