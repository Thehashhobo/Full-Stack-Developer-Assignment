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

            // Shipment to ShipmentDTO mapping
            CreateMap<Shipment, ShipmentDTO>()
                .ForMember(dest => dest.Carrier, opt => opt.MapFrom(src => src.CarrierId));

            // Reverse mapping: ShipmentDTO to Shipment
            CreateMap<ShipmentDTO, Shipment>()
                .ForMember(dest => dest.CarrierId, opt => opt.MapFrom(src => src.Carrier))
                .ForMember(dest => dest.Carrier, opt => opt.Ignore()); // Ignore navigation property

            CreateMap<UpdateShipmentStatusDTO, Shipment>(); //unnecessary mapping,
        }
    }
}