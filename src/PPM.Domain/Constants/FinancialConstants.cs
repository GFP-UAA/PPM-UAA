namespace PPM.Domain.Constants;

// Valores financieros que usa todo el sistema, juntos en un solo lugar para
// poder ajustarlos fácil si alguna vez cambian.
public static class FinancialConstants
{
    // Aporte del trabajador al IPS: 9% del salario bruto. El aporte patronal no le
    // descuenta nada al empleado, así que no lo tenemos en cuenta acá.
    public const decimal IpsEmployeeRate = 0.09m;
}
