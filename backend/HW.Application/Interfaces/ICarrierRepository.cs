using HW.Domain.Entities;

namespace HW.Application.Interfaces
{
    public interface ICarrierRepository
    {
        Task<IEnumerable<Carrier>> GetAllCarriersAsync();
    }
}
