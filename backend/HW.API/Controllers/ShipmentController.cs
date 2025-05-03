using HW.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HW.Application.DTOs;

namespace HW.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly IShipmentService _service;

        public ShipmentController(IShipmentService service)
        {
            _service = service;
        }

        // GET /api/shipments - List all shipments (with filter by status, carrier)
        [HttpGet("")]
        [ProducesResponseType(typeof(PaginatedShipmentsDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllShipments(
            [FromQuery] string? status,
            [FromQuery] int? carrier,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var shipments = await _service.GetAllShipmentsAsync(new ShipmentQueryDTO
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Status = status,
                Carrier = carrier
            });
            return Ok(shipments);
        }

        // POST /api/shipments - Add new shipment
        [HttpPost("")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddShipment(
            [FromBody] ShipmentDTO shipmentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.AddShipmentAsync(shipmentDTO);
            return CreatedAtAction(nameof(GetAllShipments), new { id = shipmentDTO.Id }, shipmentDTO);
        }

        // PUT /api/shipments/{id}/status - Update shipment status
        [HttpPut("{id}/status")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateShipmentStatus(
            int id, 
            [FromBody] UpdateShipmentStatusDTO updateDTO)
        {
            try
            {
                // Pass the ID from the URL and the status from the body to the service
                await _service.UpdateShipmentAsync(id, updateDTO);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
