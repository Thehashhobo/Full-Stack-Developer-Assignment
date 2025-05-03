using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HW.Application.Interfaces;
using HW.Application.DTOs;
using AutoMapper;

namespace HW.Application.Services
{
    public class CarrierService : ICarrierService
    {
        private readonly ICarrierRepository _carrierRepository;
        private readonly IMapper _mapper;

        public CarrierService(ICarrierRepository carrierRepository, IMapper mapper)
        {
            _carrierRepository = carrierRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CarrierDTO>> GetAllCarriersAsync()
        {
            var carriers = await _carrierRepository.GetAllCarriersAsync();
            return _mapper.Map<IEnumerable<CarrierDTO>>(carriers);
        }
    }
}
