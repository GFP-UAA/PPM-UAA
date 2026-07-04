using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface ICreditCardService
{
    Task<CreditCardDto> CreateAsync(CreateCreditCardDto dto);
    Task<IEnumerable<CreditCardDto>> GetAllAsync(int userId);
    Task<CreditCardDto?> GetByIdAsync(int id);
    Task<bool> UpdateAsync(UpdateCreditCardDto dto);
    Task<bool> DeleteAsync(int id);

    /// <summary>Registra un consumo (aumenta el saldo). No exige pago mínimo.</summary>
    Task<PaymentResultDto> RegisterConsumoAsync(RegisterMovementDto dto);

    /// <summary>Registra un pago normal (reduce el saldo). No exige pago mínimo.</summary>
    Task<PaymentResultDto> RegisterPaymentAsync(RegisterMovementDto dto);

    /// <summary>
    /// Procesa el cierre: aplica interés sobre el saldo no pagado y valida el pago mínimo.
    /// Si el saldo es 0, no hay interés ni mínimo.
    /// </summary>
    Task<PaymentResultDto> ProcessClosingAsync(RegisterPaymentDto dto);

    /// <summary>Libro de movimientos (consumos y pagos).</summary>
    Task<IEnumerable<CardMovementDto>> GetMovementsAsync(int cardId);

    /// <summary>Historial de cierres.</summary>
    Task<IEnumerable<CreditCardPaymentDto>> GetPaymentsAsync(int cardId);
}
