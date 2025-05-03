using HW.Application.DTOs;

namespace HW.Application.Interfaces
{
    public interface IShipmentService
    {
        Task<PaginatedShipmentsDTO> GetAllShipmentsAsync(ShipmentQueryDTO queryDTO);
        // dont need
        // Task<ShipmentDTO> GetShipmentByIdAsync(int id);
        Task AddShipmentAsync(ShipmentDTO shipmentDTO);
        Task UpdateShipmentAsync(int id, UpdateShipmentStatusDTO updateShipmentStatusDTO);
    }
}
