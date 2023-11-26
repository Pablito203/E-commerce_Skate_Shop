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

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<PedidoProduto> PedidoProdutos { get; set; }

    public virtual DbSet<Produto> Produtos { get; set; }

    public virtual DbSet<ProdutoTamanho> ProdutoTamanhos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioFavorito> UsuarioFavoritos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=PABLO\\SQLEXPRESS;Initial Catalog=skate_shop;Integrated Security=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Latin1_General_100_CI_AI_SC_UTF8");

        modelBuilder.Entity<Anexo>(entity =>
        {
            entity.HasKey(e => e.Anexo1).HasName("PK__anexo__BE9E739E9339643E");

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
            entity.HasKey(e => e.Endereco1).HasName("PK__endereco__9456D4076140546C");

            entity.ToTable("endereco");

            entity.Property(e => e.Endereco1).HasColumnName("endereco");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.DataVencimento)
                .HasColumnType("datetime")
                .HasColumnName("data_vencimento");
            entity.Property(e => e.IdAsaas)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_asaas");
            entity.Property(e => e.PagamentoRealizado).HasColumnName("pagamento_realizado");
            entity.Property(e => e.Pedido).HasColumnName("pedido");
            entity.Property(e => e.Usuario).HasColumnName("usuario");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");

            entity.HasOne(d => d.PedidoNavigation).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.Pedido)
                .HasConstraintName("FK_endereco_pedido");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.Usuario)
                .HasConstraintName("FK_endereco_usuario");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Pedido1).HasName("PK__pedido__D213FC36F1EF6DEA");

            entity.ToTable("pedido");

            entity.Property(e => e.Pedido1).HasColumnName("pedido");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.DataVencimento)
                .HasColumnType("datetime")
                .HasColumnName("data_vencimento");
            entity.Property(e => e.IdAsaas)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_asaas");
            entity.Property(e => e.PagamentoRealizado).HasColumnName("pagamento_realizado");
            entity.Property(e => e.Usuario).HasColumnName("usuario");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pedido_usuario");
        });

        modelBuilder.Entity<PedidoProduto>(entity =>
        {
            entity.HasKey(e => e.PedidoProduto1).HasName("PK__pedido_p__670316751A544DD6");

            entity.ToTable("pedido_produto");

            entity.Property(e => e.PedidoProduto1).HasColumnName("pedido_produto");
            entity.Property(e => e.Pedido).HasColumnName("pedido");
            entity.Property(e => e.Produto).HasColumnName("produto");
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
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Produto1).HasName("PK__produto__582A8D39E7D86413");

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

        modelBuilder.Entity<ProdutoTamanho>(entity =>
        {
            entity.HasKey(e => e.ProdutoTamanho1).HasName("PK__produto___E19A00A006AF0D2E");

            entity.ToTable("produto_tamanho");

            entity.Property(e => e.ProdutoTamanho1).HasColumnName("produto_tamanho");
            entity.Property(e => e.Nome)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Produto).HasColumnName("produto");
            entity.Property(e => e.Quantidade).HasColumnName("quantidade");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.ProdutoTamanhos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_produtoTamanho_produto");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Usuario1).HasName("PK__usuario__9AFF8FC75A4DE00C");

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
                .HasColumnName("senha");
        });

        modelBuilder.Entity<UsuarioFavorito>(entity =>
        {
            entity.HasKey(e => e.UsuarioFavorito1).HasName("PK__usuario___2087104F4A716136");

            entity.ToTable("usuario_favorito");

            entity.Property(e => e.UsuarioFavorito1).HasColumnName("usuario_favorito");
            entity.Property(e => e.Produto).HasColumnName("produto");
            entity.Property(e => e.Usuario).HasColumnName("usuario");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.UsuarioFavoritos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_usuarioFavorito_produto");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.UsuarioFavoritos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_usuarioFavorito_usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
