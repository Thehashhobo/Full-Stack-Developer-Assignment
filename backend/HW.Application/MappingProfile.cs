using AutoMapper;
using HW.Application.DTOs;
using HW.Domain.Entities;

namespace HW.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Carrier, CarrierDTO>().ReverseMap();

            CreateMap<Shipment, ShipmentDTO>().ReverseMap();

            CreateMap<UpdateShipmentStatusDTO, Shipment>(); //unnecessary mapping,
        }
    }
}