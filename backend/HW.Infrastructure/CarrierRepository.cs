using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HW.Application.Interfaces;
using HW.Domain.Entities;
using HW.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HW.Infrastructure
{
    public class CarrierRepository: ICarrierRepository
    {
        private readonly AppDbContext _dbContext;

        public CarrierRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // async almost always better than sync
        public async Task<IEnumerable<Carrier>> GetAllCarriersAsync()
        {
            return await _dbContext.Carriers.ToArrayAsync();
        }
    }
    
}
