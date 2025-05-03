using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HW.Application.DTOs;

namespace HW.Application.Interfaces
{
    public interface ICarrierService
    {
        Task<IEnumerable<CarrierDTO>> GetAllCarriersAsync();

    }
}
