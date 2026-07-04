using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface IDashboardService
{
    Task<DashboardDto> GetDashboardAsync(int userId);
}
