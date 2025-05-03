using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HW.Domain.Entities;

namespace HW.Application.Interfaces
{
    public interface ICarrierRepository
    {
        Task<IEnumerable<Carrier>> GetAllCarriersAsync();
    }
}
