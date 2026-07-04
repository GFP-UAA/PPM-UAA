using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;

namespace PPM.Infrastructure.Data;

// Contexto de EF Core: representa la base y expone cada tabla como un DbSet.
// Acá definimos también las reglas de mapeo (precisiones, índices y borrados en cascada).
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Salary> Salaries => Set<Salary>();
    public DbSet<Debt> Debts => Set<Debt>();
    public DbSet<CreditCard> CreditCards => Set<CreditCard>();
    public DbSet<CreditCardPayment> CreditCardPayments => Set<CreditCardPayment>();
    public DbSet<CardMovement> CardMovements => Set<CardMovement>();
    public DbSet<Expense> Expenses => Set<Expense>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Usuario. El nombre de usuario no se puede repetir (índice único) y, si se
        // elimina la cuenta, se borran también todos sus datos asociados.
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Username).IsRequired().HasMaxLength(100);
            entity.Property(u => u.PasswordHash).IsRequired();
            entity.Property(u => u.Role).HasConversion<int>();
            entity.HasIndex(u => u.Username).IsUnique();

            entity.HasMany(u => u.Salaries)
                  .WithOne(s => s.User)
                  .HasForeignKey(s => s.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(u => u.Debts)
                  .WithOne(d => d.User)
                  .HasForeignKey(d => d.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(u => u.CreditCards)
                  .WithOne(c => c.User)
                  .HasForeignKey(c => c.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(u => u.Expenses)
                  .WithOne(e => e.User)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Salario. En guaraníes no manejamos centavos, por eso 0 decimales.
        modelBuilder.Entity<Salary>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Property(s => s.Amount).HasPrecision(18, 0);
            // El neto sale de una cuenta, no lo guardamos como columna.
            entity.Ignore(s => s.NetAmount);
        });

        // Deuda. Solo persistimos lo que carga el usuario; los totales y proyecciones
        // se derivan de la cuota y el plazo, así que le decimos a EF que los ignore.
        modelBuilder.Entity<Debt>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.EntityName).IsRequired().HasMaxLength(150);
            entity.Property(d => d.ProductOrService).HasMaxLength(200);
            entity.Property(d => d.Description).HasMaxLength(500);
            entity.Property(d => d.InstallmentAmount).HasPrecision(18, 0);
            entity.Property(d => d.Status).HasConversion<int>();
            entity.Ignore(d => d.MonthlyPayment);
            entity.Ignore(d => d.TotalAmount);
            entity.Ignore(d => d.RemainingInstallments);
            entity.Ignore(d => d.RemainingAmount);
            entity.Ignore(d => d.EstimatedPayoffDate);
        });

        // Tarjeta de crédito. Los montos van sin decimales; las tasas y el porcentaje
        // de pago mínimo sí necesitan decimales, por eso una precisión distinta.
        modelBuilder.Entity<CreditCard>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(150);
            entity.Property(c => c.AvailableBalance).HasPrecision(18, 0);
            entity.Property(c => c.InitialBalance).HasPrecision(18, 0);
            entity.Property(c => c.CurrentDebt).HasPrecision(18, 0);
            entity.Property(c => c.MonthlyInterestRate).HasPrecision(5, 4);
            entity.Property(c => c.MinPaymentPercentage).HasPrecision(5, 4);

            entity.HasMany(c => c.Payments)
                  .WithOne(p => p.CreditCard)
                  .HasForeignKey(p => p.CreditCardId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(c => c.Movements)
                  .WithOne(m => m.CreditCard)
                  .HasForeignKey(m => m.CreditCardId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Cada consumo o pago del libro de la tarjeta.
        modelBuilder.Entity<CardMovement>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Amount).HasPrecision(18, 0);
            entity.Property(m => m.Description).HasMaxLength(200);
            entity.Property(m => m.Type).HasConversion<int>();
        });

        // Registro histórico de cada cierre de tarjeta.
        modelBuilder.Entity<CreditCardPayment>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.PaidAmount).HasPrecision(18, 0);
            entity.Property(p => p.DebtBeforePayment).HasPrecision(18, 0);
            entity.Property(p => p.DebtAfterPayment).HasPrecision(18, 0);
            entity.Property(p => p.InterestApplied).HasPrecision(18, 0);
            entity.Property(p => p.MinimumPaymentRequired).HasPrecision(18, 0);
        });

        // Gasto mensual del usuario.
        modelBuilder.Entity<Expense>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Amount).HasPrecision(18, 0);
            entity.Property(e => e.Type).HasConversion<int>();
        });
    }
}
