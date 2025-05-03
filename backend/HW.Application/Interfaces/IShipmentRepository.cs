using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HW.Domain.Entities;

namespace HW.Application.Interfaces
{
    public interface IShipmentRepository
    {
        Task<IEnumerable<Shipment>> GetAllShipmentsAsync(
            //filters
            string? status = null, 
            int? carrier = null, 
            //pagination
            int pageNumber = 1, 
            int pageSize = 12
        );
        // also for pagination
        Task<int> GetTotalShipmentsCountAsync(string? status = null, int? carrier = null); 
        Task<Shipment> GetShipmentByIdAsync(int id);
        Task AddShipmentAsync(Shipment shipment);
        Task UpdateShipmentAsync(Shipment shipment);

    }   
}
