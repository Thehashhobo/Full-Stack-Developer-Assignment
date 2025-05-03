using HW.Application.DTOs;

namespace HW.Application.Interfaces
{
    public interface ICarrierService
    {
        Task<IEnumerable<CarrierDTO>> GetAllCarriersAsync();

    }
}
