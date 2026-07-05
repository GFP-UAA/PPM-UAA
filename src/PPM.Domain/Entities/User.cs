using PPM.Domain.Enums;

namespace PPM.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Standard;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Relaciones
    public ICollection<Salary> Salaries { get; set; } = [];
    public ICollection<Debt> Debts { get; set; } = [];
    public ICollection<CreditCard> CreditCards { get; set; } = [];
    public ICollection<Expense> Expenses { get; set; } = [];
    public ICollection<Income> Incomes { get; set; } = [];
}
