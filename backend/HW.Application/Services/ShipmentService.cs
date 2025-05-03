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
        private readonly ILogService _logger;

        public ShipmentService(IShipmentRepository shipmentRepository, IMapper mapper, ILogService logger)
        {
            _shipmentRepository = shipmentRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<PaginatedShipmentsDTO> GetAllShipmentsAsync(ShipmentQueryDTO queryDTO)
        {
            _logger.Info($"Fetching shipments for page {queryDTO.PageNumber}, status: {queryDTO.Status}, carrier: {queryDTO.Carrier}");
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
        
        // dont need
        // public async Task<ShipmentDTO> GetShipmentByIdAsync(int id)
        // {
        //     // Fetch shipment by ID
        //     var shipment = await _shipmentRepository.GetShipmentByIdAsync(id);

        //     // Map domain entity to DTO
        //     return _mapper.Map<ShipmentDTO>(shipment);
        // }

        public async Task AddShipmentAsync(ShipmentDTO shipmentDTO)
        {
            _logger.Info($"Adding new shipment from {shipmentDTO.Origin} to {shipmentDTO.Destination}, from {shipmentDTO.ShipDate} to {shipmentDTO.ETA}");
            // Map DTO to domain entity
            var shipment = _mapper.Map<Shipment>(shipmentDTO);

            // Add shipment to the repository
            await _shipmentRepository.AddShipmentAsync(shipment);
            _logger.Info("Shipment successfully added.");
        }

    public async Task UpdateShipmentAsync(int id, UpdateShipmentStatusDTO updateShipmentStatusDTO)
    {
        _logger.Info($"Attempting to update shipment ID {id}");
            // Fetch the shipment by ID
            var shipment = await _shipmentRepository.GetShipmentByIdAsync(id);

        if (shipment == null)
        {
            throw new KeyNotFoundException($"Shipment with ID {id} not found.");
        }

        // Update the shipment's status using the DTO
        shipment.Status = updateShipmentStatusDTO.Status;

        // Save the updated shipment
        await _shipmentRepository.UpdateShipmentAsync(shipment);
    }
    }
}