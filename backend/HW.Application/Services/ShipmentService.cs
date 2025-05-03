using HW.Application.DTOs;
using HW.Application.Interfaces;
using HW.Domain.Entities;
using AutoMapper;

namespace HW.Application.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _shipmentRepository;
        private readonly IMapper _mapper;

        public ShipmentService(IShipmentRepository shipmentRepository, IMapper mapper)
        {
            _shipmentRepository = shipmentRepository;
            _mapper = mapper;
        }

        public async Task<PaginatedShipmentsDTO> GetAllShipmentsAsync(ShipmentQueryDTO queryDTO)
        {
            // Fetch shipments for the current page
            var shipments = await _shipmentRepository.GetAllShipmentsAsync(
                queryDTO.Status,
                queryDTO.Carrier,
                queryDTO.PageNumber,
                queryDTO.PageSize
            );

            // Fetch the total count of shipments
            var totalCount = await _shipmentRepository.GetTotalShipmentsCountAsync(
                queryDTO.Status,
                queryDTO.Carrier
            );

            // Map domain entities to DTOs
            var shipmentDTOs = _mapper.Map<IEnumerable<ShipmentDTO>>(shipments);

            // Create and return the paginated DTO
            return new PaginatedShipmentsDTO
            {
                Shipments = shipmentDTOs,
                CurrentPage = queryDTO.PageNumber,
                PageSize = queryDTO.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<ShipmentDTO> GetShipmentByIdAsync(int id)
        {
            // Fetch shipment by ID
            var shipment = await _shipmentRepository.GetShipmentByIdAsync(id);

            // Map domain entity to DTO
            return _mapper.Map<ShipmentDTO>(shipment);
        }

        public async Task AddShipmentAsync(ShipmentDTO shipmentDTO)
        {
            // Map DTO to domain entity
            var shipment = _mapper.Map<Shipment>(shipmentDTO);

            // Add shipment to the repository
            await _shipmentRepository.AddShipmentAsync(shipment);
        }

        public async Task UpdateShipmentAsync(UpdateShipmentStatusDTO updateDTO)
        {
            // Fetch the shipment from the repository
            var shipment = await _shipmentRepository.GetShipmentByIdAsync(updateDTO.Id);

            if (shipment == null)
            {
                throw new KeyNotFoundException($"Shipment with ID {updateDTO.Id} not found.");
            }

            // Update the shipment's status
            shipment.Status = updateDTO.Status;

            // Save the updated shipment
            await _shipmentRepository.UpdateShipmentAsync(shipment);
        }
    }
}