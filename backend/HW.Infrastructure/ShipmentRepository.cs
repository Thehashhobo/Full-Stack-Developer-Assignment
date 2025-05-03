using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HW.Application.Interfaces;
using HW.Domain.Entities;
using HW.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HW.Infrastructure
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly AppDbContext _dbContext;

        public ShipmentRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddShipmentAsync(Shipment shipment)
        {
            _dbContext.Shipments.Add(shipment);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Shipment>> GetAllShipmentsAsync(
            string? status = null,
            int? carrier = null,
            int pageNumber = 1,
            int pageSize = 10
        )
        {
            var query = _dbContext.Shipments.AsQueryable();

            // Filter by status if provided
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status == status);
            }

            // Filter by carrier ID if provided
            if (carrier.HasValue)
            {
                query = query.Where(s => s.CarrierId == carrier.Value);
            }

            // Apply pagination
            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> GetTotalShipmentsCountAsync(string? status = null, int? carrier = null)
        {
            var query = _dbContext.Shipments.AsQueryable();

            // Filter by status if provided
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status == status);
            }

            // Filter by carrier ID if provided
            if (carrier.HasValue)
            {
                query = query.Where(s => s.CarrierId == carrier.Value);
            }

            return await query.CountAsync();
        }

        public async Task<Shipment> GetShipmentByIdAsync(int id)
        {
            var shipment = await _dbContext.Shipments.FindAsync(id);
            if (shipment == null)
            {
                throw new KeyNotFoundException($"Shipment with ID {id} was not found.");
            }
            return shipment;
        }

        public async Task UpdateShipmentAsync(Shipment shipment)
        {
            _dbContext.Shipments.Update(shipment);
            await _dbContext.SaveChangesAsync();
        }
    }
}
